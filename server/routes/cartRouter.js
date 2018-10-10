'use strict'

const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cartController');
const IsLogin = require('../middlewares/IsLogin');



// get 
router.post('/',IsLogin,CartController.getCarts)

router.post('/length',IsLogin,CartController.getLengthCart)

// add 
router.post('/',IsLogin,CartController.addCart)

// edit 
router.put('/:id',IsLogin,CartController.editCart)

// delete
router.delete('/:id',IsLogin,CartController.deleteCart)

module.exports = router