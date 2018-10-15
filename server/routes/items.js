var express = require('express');
var router = express.Router();
const {show, add, edit, remove, find, getItemByCategory, search, editWithImage} = require('../controllers/items')
const GCS = require('../helpers/GCSupload')
const {isAdmin} = require('../middleware/index')

router.get('/', show)
router.post('/', isAdmin, GCS.multer.single('image'), GCS.sendUploadToGCS , add)
router.put('/', isAdmin, edit)
router.delete('/:id', isAdmin, remove)
router.get('/:id', find)
router.get('/category/:id', getItemByCategory)
router.get('/search/:q', search)
router.put('/image', isAdmin, GCS.multer.single('image'), GCS.sendUploadToGCS, editWithImage)

module.exports = router