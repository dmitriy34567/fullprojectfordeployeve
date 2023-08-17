const Router = require('express')
const router = new Router()
const AnsverReqController = require('../controllers/ansverReqController')
const checkRole = require('../middleware/checkRoleMiddleware')


router.post('/create', AnsverReqController.create)//, checkRole('USER')
router.get('/get', AnsverReqController.getAll)//, checkRole('ADMIN')
router.get('/reciever/:id', AnsverReqController.getByIdReciever) //Id of reciever , checkRole('USER')
router.get('/author/:id', AnsverReqController.getByIdAuthor) 
router.get('/evreq/:id', AnsverReqController.getByIdEvReq)

module.exports = router