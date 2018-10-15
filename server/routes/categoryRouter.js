'use strict'

const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController');
const IsLogin = require('../middlewares/IsLogin');
const IsAdmin = require('../middlewares/IsAdmin');

router.get('/',CategoryController.getCategory)

router.post('/',IsLogin,IsAdmin,CategoryController.createCategory)


router.get('/lists',CategoryController.getCategoryAndFirstItemCategory)


router.post('/view',CategoryController.getCategoryByName)


router.put('/',IsLogin,IsAdmin,CategoryController.editCategory)


router.delete('/',IsLogin,IsAdmin, CategoryController.deleteCategory)

module.exports = router