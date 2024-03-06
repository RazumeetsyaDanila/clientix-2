const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.auth)
router.get('/get_orgs', authMiddleware, userController.get_orgs)

router.post('/get_anydesk', authMiddleware, userController.get_anydesk)
router.post('/add_anydesk', authMiddleware, userController.add_anydesk)
router.post('/delete_anydesk', authMiddleware, userController.delete_anydesk)

router.post('/get_vpn', authMiddleware, userController.get_vpn)
router.post('/add_vpn', authMiddleware, userController.add_vpn)
router.post('/delete_vpn', authMiddleware, userController.delete_vpn)

router.post('/get_other_access', authMiddleware, userController.get_other_access)
router.post('/add_other_access', authMiddleware, userController.add_other_access)
router.post('/delete_other_access', authMiddleware, userController.delete_other_access)

router.post('/add_org', authMiddleware, userController.add_org)
router.post('/delete_org', authMiddleware, userController.delete_org)
router.post('/get_org', authMiddleware, userController.get_org)
router.post('/update_org', authMiddleware, userController.update_org)

router.post('/get_rdp', authMiddleware, userController.get_rdp)
router.post('/add_rdp', authMiddleware, userController.add_rdp)
router.post('/delete_rdp', authMiddleware, userController.delete_rdp)

router.post('/get_egisz', authMiddleware, userController.get_egisz)
router.post('/add_egisz', authMiddleware, userController.add_egisz)
router.post('/delete_egisz', authMiddleware, userController.delete_egisz)

module.exports = router