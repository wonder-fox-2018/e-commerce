'use strict'
const express = require('express'),
      router = express.Router(),
      images = require('../helpers/images'),
      { isLogin, isAdmin } = require('../middlewares/isAuth')


router.post('/', isLogin, isAdmin,
  images.multer.single('image'), 
  images.sendUploadToGCS,
  (req, res) => {
    res.send({
      status: 200,
      message: 'Your file is successfully uploaded',
      link: req.file.cloudStoragePublicUrl
    })
  })

module.exports = router