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
}

module.exports = new TechController()