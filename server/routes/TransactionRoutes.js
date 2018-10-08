'use strict'

const express = require('express')
const router = express.Router()
const TransactionController = require('../controllers/TransactionController')
const isLogin = require('../middlewares/isLogin')
const isAdmin = require('../middlewares/isAdmin')

router.post('/', isLogin, TransactionController.createTransaction)
      .get('/lists', isLogin, isAdmin, TransactionController.showListTransaction)

module.exports = router