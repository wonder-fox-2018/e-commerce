const transactionRouter = require('express').Router();
const TransactionController = require('../controllers/transactionController.js');
const isLogin = require('../middlewares/isLogin.js');

transactionRouter.post('/', isLogin, TransactionController.create);

module.exports = transactionRouter;