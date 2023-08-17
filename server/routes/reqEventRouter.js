const Router = require('express')
const router = new Router()
const reqEventController = require('../controllers/reqEventController')
const checkRole = require('../middleware/checkRoleMiddleware')


router.post('/create', reqEventController.create)//, checkRole('USER')
router.get('/get', reqEventController.getAll)//, checkRole('ADMIN')
router.get('/:id', reqEventController.getByIdReciever) //Id of reciever , checkRole('USER')
router.patch('/:id',  reqEventController.editReq)

module.exports = router