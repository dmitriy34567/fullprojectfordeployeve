const Router = require('express')
const router = new Router()

const userRouter = require('./userRouter')
const profileRouter = require('./profileRouter')
const eventRouter = require('./eventRouter')
const reqEventRouter = require('./reqEventRouter')
const AnsverReqRouter = require('./ansverReqRouter')

router.use('/user', userRouter)
router.use('/profile', profileRouter)
router.use('/event', eventRouter)
router.use('/reqevent', reqEventRouter)
router.use('/ansverreq', AnsverReqRouter)

module.exports = router
