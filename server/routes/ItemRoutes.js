'use strict'

const express = require('express')
const router = express.Router()
const ItemController = require('../controllers/ItemController')
const isLogin = require('../middlewares/isLogin')
const isAdmin = require('../middlewares/isAdmin')

router.post('/', isLogin, isAdmin, ItemController.createItem)
      .get('/lists', ItemController.getItemLists)
      .get('/:id', ItemController.getDetail)
      .put('/:id', isLogin, isAdmin, ItemController.editItem)
      .delete('/:id', isLogin, isAdmin, ItemController.deleteItem)
      .post('/search' , ItemController.searchItemByKeyword)

module.exports = router