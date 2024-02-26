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

class UserController {

    async login(req, res, next) {
        try {
            const { login, password } = req.body
            let pool = await sql.connect(sqlConfig)
            let candidate = await pool.request()
                .input('login', sql.VarChar, login)
                .query('SELECT * FROM USERS WHERE USER_LOGIN = @login')

            if (candidate.recordset.length == 0) return next(ApiError.internal('Пользователь не найден'))

            let comparePassword = bcrypt.compareSync(password, candidate.recordset[0].USER_PASSWORD)
            if (!comparePassword) return next(ApiError.internal('Указан неверный пароль'))

            const token = generateJwt(candidate.recordset[0].USER_LOGIN, candidate.recordset[0].USER_ROLE)
            return res.json({ token })
        } catch (e) {
            return res.json(e.message);
        }
    }

    async auth(req, res) {
        const token = generateJwt(req.user.login, req.user.role)
        return res.json({ token })
    }

    async get_orgs(req, res, next) {
        try {
            let pool = await sql.connect(sqlConfig)
            let organizations = await pool.request()
                .query('SELECT ORG_ID, ORG_NAME,ORG_SIMED_PASS ,ORG_REMOTE_ACCESS_TYPE, ORG_COMMENT, ORG_CITY FROM ORGANIZATION')

            if (organizations.recordset.length == 0) return next(ApiError.internal('Ни одной организации не найдено'))

            return res.json(organizations.recordset)
        } catch (e) {
            return res.json(e.message);
        }
    }
}

module.exports = new UserController()