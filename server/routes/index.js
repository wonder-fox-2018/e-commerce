var express = require('express');
var router = express.Router();
const {glogin, login} = require('../controllers/users')

/* GET home page. */
// router.post('/glogin', glogin)

router.post('/login', login)

module.exports = router;
 