var express = require('express');
var router = express.Router();

const routeCustomers = require('./users')
const routeItems = require('./items')
const routeCarts = require('./carts')
const routeCategory = require('./categories')
/* GET home page. */
router.get('/',(req, res)=>{res.send('')})

router.use('/customers', routeCustomers );
router.use('/items', routeItems );
router.use('/carts', routeCarts );
router.use('/categories', routeCategory)


module.exports = router;
