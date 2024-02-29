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
                .query('SELECT ORG_ID, ORG_NAME,ORG_SIMED_ADMIN_PASS, ORG_REMOTE_ACCESS_TYPE, ORG_COMMENT, ORG_CITY FROM ORGANIZATION')

            if (organizations.recordset.length == 0) return next(ApiError.internal('Ни одной организации не найдено'))

            return res.json(organizations.recordset)
        } catch (e) {
            return res.json(e.message);
        }
    }

    async get_rdp(req, res, next) {
        try {
            const { org_id } = req.body
            let pool = await sql.connect(sqlConfig)

            let rdp = await pool.request()
                .input('ORG_ID', sql.Int, org_id)
                .query('SELECT * FROM RDP_SERVER WHERE ORG_ID = @org_id')
            return res.json(rdp.recordset)
        } catch (e) {
            return res.json(e.message);
        }
    }

    async get_anydesk(req, res, next) {
        try {
            const { org_id } = req.body
            let pool = await sql.connect(sqlConfig)

            let anydesk = await pool.request()
                .input('ORG_ID', sql.Int, org_id)
                .query('SELECT * FROM ANYDESK_SERVER WHERE ORG_ID = @org_id')
            return res.json(anydesk.recordset)
        } catch (e) {
            return res.json(e.message);
        }
    }

    async get_vpn(req, res, next) {
        try {
            const { org_id } = req.body
            let pool = await sql.connect(sqlConfig)

            let vpn = await pool.request()
                .input('ORG_ID', sql.Int, org_id)
                .query('SELECT * FROM VPN WHERE ORG_ID = @org_id')
            return res.json(vpn.recordset)
        } catch (e) {
            return res.json(e.message);
        }
    }

    async get_other_access(req, res, next) {
        try {
            const { org_id } = req.body
            let pool = await sql.connect(sqlConfig)

            let other_access = await pool.request()
                .input('ORG_ID', sql.Int, org_id)
                .query('SELECT * FROM OTHER_ACCESS_SERVER WHERE ORG_ID = @org_id')
            return res.json(other_access.recordset)
        } catch (e) {
            return res.json(e.message);
        }
    }

    async add_org(req, res, next) {
        try {
            const { org_name, org_city} = req.body
            let pool = await sql.connect(sqlConfig)

            await pool.request()
                .input('org_name', sql.VarChar, org_name)
                .input('city', sql.VarChar, org_city)
                .query('INSERT INTO ORGANIZATION (org_name, org_city)' +
                    'VALUES (@org_name, @city)')

            let orgId = await pool.request()
            .input('org_name', sql.VarChar, org_name)
            .query('SELECT * FROM ORGANIZATION WHERE ORG_NAME = @org_name')

            return res.json(orgId.recordset[0].ORG_ID)
        } catch (e) {
            return res.json(e.message);
        }
    }
}

module.exports = new UserController()