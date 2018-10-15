'use strict'

const express = require('express');
const router = express.Router();
const IsLogin = require('../middlewares/IsLogin');
const IsAdmin = require('../middlewares/IsAdmin');
// const IsAdmin = require('../middlewares/IsAdmin');
const UserController = require('../controllers/userController');



router.post('/register', UserController.registerUser)

router.post('/login', UserController.loginUser)

router.post('/adminlogin', UserController.loginAdmin)

router.get('/', IsLogin,IsAdmin,UserController.getAllUsers)

router.post('/tokenadmin', IsLogin,IsAdmin,UserController.checkAdmin)


module.exports = router
