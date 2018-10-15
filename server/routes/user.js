const express = require('express'),
      router = express.Router(),
      Controller = require('../controllers/user')

router
      .post('/register', Controller.signUp)
      .post('/login', Controller.signIn)


module.exports = router