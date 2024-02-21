const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sqlConfig = require('../db');
const sql = require('mssql')

const generateJwt = (user_id, login, role) => {
    return jwt.sign(
        { user_id, login, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}

class AdminController {

    async registration(req, res, next) {
        try {
            const { login, password, role } = req.body

            if (!login || !password) return next(ApiError.badRequest('Некорректный логин или пароль'))

            let pool = await sql.connect(sqlConfig)
            let candidate = await pool.request()
                .input('login', sql.VarChar, login)
                .query('SELECT * FROM USERS WHERE USER_LOGIN = @login')
            if(candidate.recordset.length > 0) return res.json({ message: "Пользователь с таким логином уже существует!" })

            const hashPassword = await bcrypt.hash(password, 5)

            await pool.request()
                .input('login', sql.VarChar, login)
                .input('password', sql.VarChar, hashPassword)
                .input('role', sql.VarChar, role)
                .query('INSERT INTO USERS (USER_LOGIN, USER_PASSWORD, USER_ROLE, USER_RATING) values(@login, @password, @role, 0)')

            const token = generateJwt(login, role)
            return res.json({token})        
        } catch (e) {
            return res.json(e.message);
        }
    }
}

module.exports = new AdminController()