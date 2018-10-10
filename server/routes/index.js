var express = require('express');
var router = express.Router();
const authentication = require("../middlewares/authentication");
const userController = require('../controllers/UserController.js')

router.post("/login", authentication.login)
router.post("/login/google", authentication.glogin)
router.post("/register", userController.create)


// router.use(authentication.checkToken, authentication.checkifTokenValid)

router.use('/users',require('./UserRoutes.js'))
router.use('/products',require('./ProductRoutes.js'))
router.use('/carts',require('./CartRoutes.js'))
router.use('/categories',require('./CategoryRoutes.js'))

module.exports = router;
