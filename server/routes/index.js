const Router = require('express')
const router = new Router()
const techRouter = require('./techRouter')
const adminRouter = require('./adminRouter')

router.use('/tech', techRouter)
router.use('/admin', adminRouter)

module.exports = router