var express = require('express');
var router = express.Router();
const CartController = require('../controllers/cartController');
const UserController = require('../controllers/userController');
const ItemControler = require('../controllers/itemController');
const Middlewares = require('../middlewares/index');
const CategortController = require('../controllers/categoryController');
const TransactionController = require('../controllers/transactionController');
images = require('../helpers/images')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('home');
});


//public
router.post('/login', UserController.login);

router.post('/register', UserController.register);

router.post('/register-admin', UserController.registerAdmin);

router.get('/item', ItemControler.showAll);

router.get('/category/:name', ItemControler.findByCategory);

/* router.post('/category', CategortController.create);

router.put('/category/:id', CategortController.addItem);

router.get('/category/:name', CategortController.showCategory); */




//auth



router.use(Middlewares.isLogin);

router.get('/user-info', UserController.findById);

router.post('/transaction', TransactionController.create);


router.get('/cart', CartController.getCart);
router.put('/cart/:id', CartController.addItemToCart);
router.patch('/cart/:id', CartController.removeItem);





//admin

router.use(Middlewares.isAdmin);

router.post('/item', ItemControler.create);

router.put('/item/:id', ItemControler.update);

router.delete('/item/:id', ItemControler.delete);


router.post('/item/upload',
  images.multer.single('image'), 
  images.sendUploadToGCS,
  (req, res) => {
    res.send({
      status: 200,
      message: 'Your file is successfully uploaded',
      link: req.file.cloudStoragePublicUrl
    })
  });





module.exports = router;
