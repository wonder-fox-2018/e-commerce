const cartRouter = require('express').Router();
const CartController = require('../controllers/cartController.js');
const isLogin = require('../middlewares/isLogin.js');

cartRouter.get('/', isLogin, CartController.showCart);
// cartRouter.get('/', CartController.getAll);
cartRouter.put('/:id', isLogin, CartController.addItem);
cartRouter.patch('/:id', isLogin, CartController.removeItem);
cartRouter.get('/empty', isLogin, CartController.emptyCart);

module.exports = cartRouter;