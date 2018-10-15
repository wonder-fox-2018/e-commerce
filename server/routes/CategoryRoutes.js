var express = require('express');
var router = express.Router();
var CategoryController = require('../controllers/CategoryController.js');

router.get('/', CategoryController.list);
router.get('/:id', CategoryController.show);
router.post('/', CategoryController.create);
router.put('/:id', CategoryController.update);
router.delete('/:id', CategoryController.remove);

module.exports = router;
