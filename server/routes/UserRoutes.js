'use strict'

const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const isLogin = require('../middlewares/isLogin')

// get detail of user
router.get('/', isLogin, UserController.getUserDetail)


module.exports = router