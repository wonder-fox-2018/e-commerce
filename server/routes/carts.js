var express = require('express');
var router = express.Router();
const Controller = require('../controllers/cart')

/* GET CARTS listing. */
router.get('/', Controller.read);
router.post('/', Controller.create);
router.put('/:id', Controller.findById);
// router.delete('/:id', Controller.delete)

module.exports = router;
