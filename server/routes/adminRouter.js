const Router = require('express')
const router = new Router()
const adminController = require('../controllers/adminController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/registration',  adminController.registration)
// router.post('/delete_user', checkRoleMiddleware('admin'), adminController.delete_user)
// router.post('/delete_org', checkRoleMiddleware('admin'), adminController.delete_org)
// router.get('/get_users', checkRoleMiddleware('admin'), adminController.get_users)
// router.post('/delete_tag', checkRoleMiddleware('admin'), adminController.delete_tag)
// router.post('/update_tag', checkRoleMiddleware('admin'), adminController.update_tag)
// router.post('/add_tags_group', checkRoleMiddleware('admin'), adminController.add_tags_group)
// router.post('/add_tag', checkRoleMiddleware('admin'), adminController.add_tag)

module.exports = router