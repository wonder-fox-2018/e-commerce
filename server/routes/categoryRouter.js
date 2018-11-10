const categoryRouter = require('express').Router();
const CategoryController = require('../controllers/categoryController.js');
const isLogin = require('../middlewares/isLogin.js');
const isAdmin = require('../middlewares/isAdmin.js');

categoryRouter.post('/', CategoryController.create);
categoryRouter.get('/:id', CategoryController.getOne);
categoryRouter.get('/', CategoryController.getAll);
categoryRouter.put('/:id', isLogin, isAdmin, CategoryController.update);
categoryRouter.delete('/:id', isLogin, isAdmin, CategoryController.delete);

module.exports = categoryRouter;