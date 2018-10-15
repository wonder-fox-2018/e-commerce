const express = require('express'),
      router = express.Router(),
      Controller = require('../controllers/item'),
      Auth = require('../middlewares/authentication')

router
    .post('/add', Auth.authenticate, Auth.authorize, Controller.create)
    .get('/findAll', Auth.authenticate, Auth.authorize, Controller.findAll)
    .put('/edit/:id', Auth.authenticate, Auth.authorize, Controller.update)
    .delete('/delete/:id', Auth.authenticate, Auth.authorize, Controller.remove)

module.exports = router