const router = require('express').Router()
const productController = require('../controllers/productController')

router.get('/', (req, res) => {
    res.send('ini dari product')
})


router.post('/add/category', productController.addCategory)
router.post('/add', productController.addProduct)
router.get('/showAll', productController.showAll)
router.get('/showAllCategory', productController.showAllCategory)
router.put('/edit/:id', productController.updateProduct)
router.put('/edit/category/:id', productController.updateCategory)
router.delete('/delete/:id', productController.deleteProduct)
router.delete('/delete/category/:id', productController.deleteCategory)

module.exports = router