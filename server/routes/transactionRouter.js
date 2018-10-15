'use strict'

const express = require('express');
const router = express.Router();
const TransController = require('../controllers/transactionController');
const isLogin = require('../middlewares/IsLogin');



// get 
router.get('/',isLogin,TransController.getTransaction)

// add 
router.post('/',isLogin,TransController.createTransaction)

//router.post('/deletebyitem',isLogin,CartController.deleteCartItem)

// // edit 
// router.put('/:id',IsLogin,CartController.editCart)

// // delete
// router.delete('/:id',IsLogin,CartController.deleteCart)

module.exports = router