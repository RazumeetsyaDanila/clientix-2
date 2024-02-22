const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const techRouter = require('./techRouter')
const adminRouter = require('./adminRouter')

router.use('/user', userRouter)
router.use('/tech', techRouter)
router.use('/admin', adminRouter)

module.exports = router