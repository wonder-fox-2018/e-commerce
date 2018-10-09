var express = require('express');
var router = express.Router();
var { show, add, edit, remove } = require('../controllers/categories')

router.get('/', show)
router.post('/', add)
router.put('/:id', edit)
router.delete('/:id', remove)

module.exports = router;