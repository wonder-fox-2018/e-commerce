const express = require('express'),
    router = express.Router(),
    { isLogin } = require("../middlewares/auth"),
    { list, addToCart, remove, update, getMyHistory } = require('../controllers/transactions');

/* GET transactions listing. */
router
    .get('/', list)

    .post('/', isLogin, addToCart)
    
    .get('/history', isLogin, getMyHistory)

    .delete('/:id', remove)

module.exports = router;
