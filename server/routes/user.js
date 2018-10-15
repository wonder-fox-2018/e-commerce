const router = require('express').Router()
const Controller = require('../controllers/userController')

router.post('/signup', Controller.signup)
router.post('/signin', Controller.signin)

module.exports = router