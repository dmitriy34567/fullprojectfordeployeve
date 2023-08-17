const Router = require('express')
const router = new Router()
const profileController = require('../controllers/profileController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/create',  profileController.create)//, checkRole('USER')
router.get('/get',  profileController.getAll)//, checkRole('ADMIN')
router.get('/:id',  profileController.getOne) //get profile by id checkRole('USER'),
router.patch('/:id',  profileController.editProfile)

module.exports = router
