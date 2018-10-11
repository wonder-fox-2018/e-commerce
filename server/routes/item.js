const express = require('express'),
      router = express.Router(),
      Controller = require('../controllers/item')

router
    .post('/add', Controller.create)
    .get('/findAll', Controller.findAll)
    .put('/edit/:id', Controller.update)
    .delete('/delete/:id', Controller.remove)

module.exports = router