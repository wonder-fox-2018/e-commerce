const express = require('express');
const router = express.Router();
const { showAll, showByCategory, search, add, edit, remove } = require('../controllers/products')
const { isLogin, isAdmin } = require('../middlewares/isAuth')

router.get('/', showAll)
router.get('/search', search)
router.get('/:category', showByCategory)
router.post('/', isLogin, isAdmin, add)
router.put('/:id', isLogin, isAdmin, edit)
router.delete('/:id', isLogin, isAdmin, remove)

module.exports = router;