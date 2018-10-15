var express = require('express');
var router = express.Router();
const userRouter = require('./users')
const productRouter = require('./product')
const userController = require('../controllers/userController')
const images = require('../helpers/images')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Welcome')
});
router.post('/signin/google', userController.googleSignin)
router.post('/signup', userController.register)
router.post('/signup/as/admin', userController.registerAdmin)
router.post('/signin', userController.signin)

router.use('/users', userRouter)
router.use('/products', productRouter)

router.post('/upload',
  images.multer.single('image'), 
  images.sendUploadToGCS,
  (req, res) => {
    res.send({
      status: 200,
      message: 'Your file is successfully uploaded',
      link: req.file.cloudStoragePublicUrl
    })
  })


module.exports = router;
