'use strict'

const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

router.post('/register', UserController.registerUser)
      .post('/login', UserController.loginUser)

module.exports = router