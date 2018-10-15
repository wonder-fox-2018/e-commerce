var express = require('express');
var router = express.Router();
var ProductController = require('../controllers/ProductController.js');

router.get('/', ProductController.list);
router.get('/:id', ProductController.show);
router.post('/', ProductController.create);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.remove);

module.exports = router;
