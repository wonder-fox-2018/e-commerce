var express = require('express');
var router = express.Router();
const Controller = require('../controllers/item')
const auth = require('../middleware/authentication')

/* GET ITEMS listing. */
router.get('/', Controller.read);
router.get('/:id', Controller.findById)
router.post('/', auth, Controller.create);
router.put('/:id', auth, Controller.update);
router.delete('/:id', auth, Controller.delete)

module.exports = router;
