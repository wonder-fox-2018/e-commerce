var express = require('express');
var router = express.Router();
var { showAll, showByCategory, add, edit, remove } = require('../controllers/products')

router.get('/', showAll)
router.get('/:category', showByCategory)
router.post('/', add)
router.put('/:id', edit)
router.delete('/:id', remove)

module.exports = router;