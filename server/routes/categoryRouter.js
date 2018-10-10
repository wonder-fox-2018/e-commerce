'use strict'

const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController');
const IsLogin = require('../middlewares/IsLogin');
const IsAdmin = require('../middlewares/IsAdmin');



router.post('/add',IsLogin,IsAdmin,CategoryController.createCategory)


router.get('/lists',CategoryController.getAllCategory)


router.post('/view',CategoryController.getCategoryByName)


router.put('/:id',CategoryController.editCategory)


router.delete('/:id',IsLogin,IsAdmin, CategoryController.deleteCategory)

module.exports = router