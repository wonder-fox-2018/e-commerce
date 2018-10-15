const express = require('express'),
    router = express.Router(),
    { list, insert, update, remove, login } = require('../controllers/users');

/* GET users listing. */
router
    .get('/', list)
    
    .post('/register', insert)

    .put('/:id', update)
    
    .delete('/:id', remove)
    
    .post('/login', login)

module.exports = router;
