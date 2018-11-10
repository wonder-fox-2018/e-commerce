const router = require('express').Router();
const UserController = require('../controllers/userController.js');
const images = require('../helpers/images');

router.get('/', function(req, res) {
    res.send('Home Page');
});

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/uploadimage',
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