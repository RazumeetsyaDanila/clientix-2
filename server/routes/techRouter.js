const Router = require('express')
const router = new Router()
const techController = require('../controllers/techController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.get('/get_tags', authMiddleware, techController.get_tags)
router.get('/get_tags_groups', authMiddleware, techController.get_tags_groups)
router.post('/add_tag', checkRoleMiddleware('tech'), techController.add_tag)
router.post('/update_tag', checkRoleMiddleware('tech'), techController.update_tag)
router.post('/delete_tag', checkRoleMiddleware('tech'), techController.delete_tag)
// router.post('/delete_org', checkRoleMiddleware('tech'), techController.delete_org)
// router.get('/get_users', checkRoleMiddleware('tech'), techController.get_users)
// router.post('/add_tags_group', checkRoleMiddleware('tech'), techController.add_tags_group)

module.exports = router