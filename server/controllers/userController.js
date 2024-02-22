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
}

module.exports = new UserController()