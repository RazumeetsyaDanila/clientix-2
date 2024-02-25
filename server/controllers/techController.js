const ApiError = require('../error/ApiError');
const jwt = require('jsonwebtoken');
const sqlConfig = require('../db');
const sql = require('mssql');
const bcrypt = require('bcrypt');

const generateJwt = (login, role) => {
    return jwt.sign(
        { login, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}

class TechController {

    async get_tags(req, res, next) {
        try {
            let pool = await sql.connect(sqlConfig)
            let tags = await pool.request()
                .query('SELECT * FROM TAG')

            if (tags.recordset.length == 0) return next(ApiError.internal('Ни одного тега не найдено!'))

            return res.json(tags.recordset)
        } catch (e) {
            return res.json(e.message);
        }
    }

    async get_tags_groups(req, res, next) {
        try {
            let pool = await sql.connect(sqlConfig)
            let tags_groups = await pool.request()
                .query('SELECT * FROM TAG_GROUP')

            if (tags_groups.recordset.length == 0) return next(ApiError.internal('Ни одной группы тегов не найдено!'))

            return res.json(tags_groups.recordset)
        } catch (e) {
            return res.json(e.message);
        }
    }

    async add_tag(req, res, next) {
        try {
            const { tag_name, group_id, tag_value1, tag_value2, tag_value3 } = req.body
            let pool = await sql.connect(sqlConfig)

            let search_tag = await pool.request()
                .input('tag_name', sql.VarChar, tag_name)
                .query('SELECT * FROM TAG WHERE TAG_NAME = @tag_name')
            if (search_tag.recordset.length > 0) return res.json({ message: "Тег с таким названием уже существует!" })

            await pool.request()
                .input('TAG_NAME', sql.VarChar, tag_name)
                .input('GROUP_ID', sql.VarChar, group_id)
                .input('TAG_VALUE1', sql.VarChar, tag_value1)
                .input('TAG_VALUE2', sql.VarChar, tag_value2)
                .input('TAG_VALUE3', sql.VarChar, tag_value3)
                
                .query('INSERT INTO TAG (TAG_NAME, GROUP_ID, TAG_VALUE1, TAG_VALUE2, TAG_VALUE3)' +
                    'VALUES (@tag_name, @group_id, @tag_value1, @tag_value2, @tag_value3)')
            return res.json({ message: "Тег добавлен!" })
        } catch (e) {
            return res.json(e.message);
        }
    }

    async update_tag(req, res, next) {
        try {
            const { tag_id, new_tag_name, tag_value1, tag_value2, tag_value3 } = req.body
            let pool = await sql.connect(sqlConfig)
            await pool.request()
                .input('tag_id', sql.Int, tag_id)
                .input('new_tag_name', sql.VarChar, new_tag_name)
                .input('tag_value1', sql.VarChar, tag_value1)
                .input('tag_value2', sql.VarChar, tag_value2)
                .input('tag_value3', sql.VarChar, tag_value3)
                .query('UPDATE TAG SET TAG_NAME = @new_tag_name, TAG_VALUE1 = @tag_value1, TAG_VALUE2 = @tag_value2, TAG_VALUE3 = @tag_value3 WHERE TAG_ID = @tag_id')
            return res.json({ message: "Тег изменен!" })
        } catch (e) {
            return res.json(e.message);
        }
    }

    async delete_tag(req, res, next) {
        try {
            const { tag_id } = req.body
            let pool = await sql.connect(sqlConfig)
            await pool.request()
                .input('tag_id', sql.Int, tag_id)
                .query('DELETE FROM TAG WHERE TAG_ID = @tag_id')
            return res.json({ message: "Тег удален!" })
        } catch (e) {
            return res.json(e.message);
        }
    }
}

module.exports = new TechController()