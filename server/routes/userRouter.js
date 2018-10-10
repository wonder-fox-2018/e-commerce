'use strict'

const express = require('express');
const router = express.Router();
const IsLogin = require('../middlewares/IsLogin');
const IsAdmin = require('../middlewares/IsAdmin');
// const IsAdmin = require('../middlewares/IsAdmin');
const UserController = require('../controllers/userController');


router.post('/register', UserController.registerUser)

router.post('/login', UserController.loginUser)

router.get('/lists', IsLogin,IsAdmin,UserController.getAllUsers)




module.exports = router
