const express = require('express'),
    router = express.Router(),
    { isLogin, isAdmin } = require("../middlewares/auth"),
    { list, insert, update, remove, findByCat, findById } = require('../controllers/items');

/* GET users listing. */
router
    .get('/', list)

    .get('/:catid', findByCat)
    
    .post('/', isLogin, isAdmin, insert)
    
    .put('/:id', isLogin, isAdmin, update)
    
    .delete('/:id', isLogin, isAdmin, remove)
    
    .get('/single/:id', findById)

module.exports = router;
