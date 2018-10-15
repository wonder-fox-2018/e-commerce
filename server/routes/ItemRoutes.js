'use strict'

const express = require('express')
const router = express.Router()
const ItemController = require('../controllers/ItemController')
const isLogin = require('../middlewares/isLogin')
const isAdmin = require('../middlewares/isAdmin')
const uploadGoogleHelper = require('../helpers/uploadGoogleHelper')

router.post('/uploads', isLogin,isAdmin,
      uploadGoogleHelper.multer.single('imagefile'),
      uploadGoogleHelper.sendUploadToGCS,
      (req,res) =>{
         res.status(201).json({
            msg: 'Upload Success',
            link: req.file.cloudStoragePublicUrl   
         })   
      }
)

router.post('/', isLogin, isAdmin, ItemController.createItem)
      .get('/lists', ItemController.getItemLists)
      .post('/search' , ItemController.searchItemByKeyword)
      .get('/:id', ItemController.getDetail)
      .put('/:id', isLogin, isAdmin, ItemController.editItem)
      .delete('/:id', isLogin, isAdmin, ItemController.deleteItem)
      

module.exports = router