const express = require('express'),
    router = express.Router(),
    { isLogin, isAdmin } = require("../middlewares/auth"),
    { list, insert, update, remove } = require('../controllers/categories');

/* GET users listing. */
router
    .get('/', list)

    .post('/', isLogin, isAdmin, insert)

    .put('/:id', isLogin, isAdmin, update)

    // .delete('/:id', isLogin, remove)

module.exports = router;
