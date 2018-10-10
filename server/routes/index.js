var express = require('express');
var router = express.Router();
const userRouter = require('./users')
const productRouter = require('./product')
const userController = require('../controllers/userController')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Welcome')
});
router.post('/signin/google', userController.googleSignin)
router.post('/signup', userController.register)
router.post('/signin', userController.signin)

router.use('/users', userRouter)
router.use('/products', productRouter)

module.exports = router;
