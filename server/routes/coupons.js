const router = require('express').Router();
const { check, use } = require('../controllers/coupons')
const { isLogin, isAdmin } = require('../middlewares/isAuth')

// router.get('/', isLogin, show)
// router.post('/', isLogin, isAdmin, add)
router.get('/:code', isLogin, check)

module.exports = router;