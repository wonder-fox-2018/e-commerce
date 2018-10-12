var express = require('express');
var router = express.Router();
const CartController = require('../controllers/cartController');
const UserController = require('../controllers/userController');
const ItemControler = require('../controllers/itemController');
const Middlewares = require('../middlewares/index');
const CategortController = require('../controllers/categoryController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('home');
});

router.post('/login', UserController.login);

router.post('/register', UserController.register);

router.get('/user-info', Middlewares.isLogin, UserController.findById);

router.post('/item', ItemControler.create); 

router.post('/cart', CartController.create);

router.get('/cart', Middlewares.isLogin, CartController.getCart);

router.put('/cart/:id', Middlewares.isLogin, CartController.addItemToCart);

router.get('/item', ItemControler.showAll);



router.post('/category', CategortController.create);

router.put('/category/:id', CategortController.addItem);

router.patch('/cart', Middlewares.isLogin, CartController.checkOut);

router.get('/category/:name', CategortController.showCategory);


module.exports = router;
