const router = require('express').Router();
const { show, add, edit, remove, login, register, getCart, updateCart, checkout} = require('../controllers/users')
const { isLogin, isAdmin } = require('../middlewares/isAuth')

router.get('/', isLogin, isAdmin, show)
router.post('/', isLogin, isAdmin, add)
router.put('/', isLogin, edit)
router.delete('/', isLogin, isAdmin, remove)
router.get('/cart', isLogin, getCart)
router.patch('/cart', isLogin, updateCart)
router.post('/login', login)
router.post('/register', register)
router.get('/check', isLogin, (req, res) => {res.status(200).json({isLogin: true})})
router.patch('/checkout', isLogin, checkout)

module.exports = router;