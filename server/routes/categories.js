const router = require('express').Router();
const { show, add, edit, remove } = require('../controllers/categories')
const { isLogin, isAdmin } = require('../middlewares/isAuth')

router.get('/', show)
router.post('/', isLogin, isAdmin, add)
router.put('/:id', isLogin, isAdmin, edit)
router.delete('/:id', remove)

module.exports = router;