'use strict'

const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cartController');
const isLogin = require('../middlewares/IsLogin');



// get 
router.get('/',isLogin,CartController.getCarts)

//router.post('/length',IsLogin,CartController.getLengthCart)

// add 
router.post('/',isLogin,CartController.createCart)

router.post('/deletebyitem',isLogin,CartController.deleteCartItem)

// // edit 
// router.put('/:id',IsLogin,CartController.editCart)

// // delete
// router.delete('/:id',IsLogin,CartController.deleteCart)

module.exports = router