'use strict'

const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/itemController');
const IsLogin = require('../middlewares/IsLogin');
const IsAdmin = require('../middlewares/IsAdmin');
// router.use(IsAdmin);


// get 
router.get('/',ItemController.getListItems)
 
//get by category
router.post('/category',ItemController.getListItemsbyCategory)
    
// add 
router.post('/',IsLogin,IsAdmin,ItemController.createItem)

// edit 
router.put('/',IsLogin,IsAdmin,ItemController.editItem)

// delete
router.delete('/',IsLogin,IsAdmin,ItemController.deleteItem)

module.exports = router