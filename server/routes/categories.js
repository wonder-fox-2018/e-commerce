var express = require('express');
var router = express.Router();
const Controller = require('../controllers/category')

/* GET CARTS listing. */
router.get('/', Controller.read);
router.post('/', Controller.create);
router.put('/:id', Controller.update);
router.delete('/:id', Controller.delete)

module.exports = router;