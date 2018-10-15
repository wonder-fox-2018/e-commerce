'use strict'

const express = require('express')
const router = express.Router()
const CategoryController = require('../controllers/CategoryController')
const isLogin = require('../middlewares/isLogin')
const isAdmin = require('../middlewares/isAdmin')

router.post('/', isLogin, isAdmin, CategoryController.createCategory)
      .get('/lists', CategoryController.displayListCategory)
      .get('/:id', CategoryController.displayCategory)
      .put('/:id', isLogin, isAdmin,CategoryController.editCategory)
      .delete('/:id', isLogin, isAdmin, CategoryController.deleteCategory)

module.exports = router