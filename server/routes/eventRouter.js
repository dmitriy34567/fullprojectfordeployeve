const Router = require('express')
const router = new Router()
const EventController = require('../controllers/eventController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/create',  EventController.create)//, checkRole('USER')
router.get('/get',  EventController.getAll)//checkRole('USER'),
router.get('/:id', EventController.getOne)//, checkRole('USER')
router.get('/author/:id', EventController.getByAuthor)
router.patch('/:id',  EventController.editEvent)

module.exports = router