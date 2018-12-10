var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')
const midleware = require('../midleware/auth')

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/profile',midleware.isLogin, userController.showProfile)
router.put('/profile', userController.editProfile)
router.get('/showUser', userController.showAllUser)
router.post('/checkout', midleware.isLogin, userController.checkout)
router.get('/checkout', midleware.isLogin, userController.checkoutPerUser)

module.exports = router;

