const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.auth)
router.get('/get_orgs', authMiddleware, userController.get_orgs)
router.post('/get_rdp', authMiddleware, userController.get_rdp)

module.exports = router