var express = require('express');
var router = express.Router();
var CartController = require('../controllers/CartController.js');

router.get('/', CartController.list);
router.get('/:id', CartController.show);
router.post('/', CartController.create);
router.put('/:id', CartController.update);
router.delete('/:id', CartController.remove);

module.exports = router;
