const itemRouter = require('express').Router();
const ItemController = require('../controllers/itemController.js');
const isLogin = require('../middlewares/isLogin.js');

itemRouter.get('/', ItemController.showAll);
itemRouter.get('/:id', ItemController.findWithId);
itemRouter.post('/', ItemController.add);
itemRouter.delete('/:id', ItemController.delete);
itemRouter.put('/:id', ItemController.update);
itemRouter.get('/search/:keyword', ItemController.searchByName);


module.exports = itemRouter;