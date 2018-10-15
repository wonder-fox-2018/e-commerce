var express = require('express');
var router = express.Router();
const {register, getUser} = require('../controllers/users')
const {isLogin} = require('../middleware/index')

router.get('/', isLogin, getUser )
router.post('/', register)



module.exports = router;
