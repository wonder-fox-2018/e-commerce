var express = require('express');
var router = express.Router();
const {show, add, edit, remove, showEdit, } = require('../controllers/categories')
const {isAdmin} = require('../middleware/index')

router.get('/', show)
router.post('/', isAdmin, add)
router.delete('/', isAdmin, remove)
router.put('/', isAdmin, edit)
router.get('/:id', showEdit)

module.exports = router


