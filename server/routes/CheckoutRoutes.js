var express = require('express');
var router = express.Router();
var CheckoutController = require('../controllers/CheckoutController.js');

router.get('/', CheckoutController.list);
router.get('/:id', CheckoutController.show);
router.post('/', CheckoutController.create);
router.put('/:id', CheckoutController.update);
router.delete('/:id', CheckoutController.remove);

module.exports = router;
