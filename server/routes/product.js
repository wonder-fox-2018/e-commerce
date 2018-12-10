const router = require('express').Router()
const productController = require('../controllers/productController')
const midleware = require('../midleware/auth')
const Product = require('../models/product')
const images = require('../helpers/images')

router.get('/', (req, res) => {
  res.send('ini dari product')
})
router.post('/add/category', productController.addCategory)
router.post('/add',midleware.isLogin, productController.addProduct)
router.get('/showAll', productController.showAll)
router.get('/showAllCategory', productController.showAllCategory)
router.put('/edit/:id', productController.updateProduct)
router.put('/edit/category/:id', productController.updateCategory)
router.delete('/delete/:id', productController.deleteProduct)
router.delete('/delete/category/:id', productController.deleteCategory)
router.post('/upload',midleware.isLogin ,images.multer.single('image'), images.sendUploadToGCS, productController.upload)
router.get('/search/:keyword', midleware.isLogin, (req, res)=> {
  Product.find({title: new RegExp(req.params.keyword, 'i')})
  .then(data => {
      res.status(200).json(data)
  })
  .catch(err => {
      res.status(500).json({error: err.message})
  })
})


module.exports = router