'use strict'

const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/itemController');
const IsLogin = require('../middlewares/IsLogin');
const IsAdmin = require('../middlewares/IsAdmin');
// router.use(IsAdmin);


// get 
router.get('/',(req,res)=>{
    ItemController.getListItems(req,res);
})
//get by category
router.post('/category',(req,res)=>{
    ItemController.getListItemsbyCategory(req,res);
})
// add 
router.post('/',IsLogin,IsAdmin,(req,res)=>{
    ItemController.createItem(req,res);
})

// edit 
router.put('/:id',IsLogin,IsAdmin,(req,res)=>{
    ItemController.editItem(req,res);
})

// delete
router.delete('/:id',IsLogin,IsAdmin,(req,res)=>{
    ItemController.deleteItem(req,res);
})

module.exports = router