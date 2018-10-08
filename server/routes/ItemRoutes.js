'use strict'

const express = require('express')
const router = express.Router()
const ItemController = require('../controllers/ItemController')

router.post('/', ItemController.createItem)
      .get('/lists', ItemController.getItemLists)

module.exports = router