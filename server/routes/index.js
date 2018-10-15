const router = require('express').Router()
const routerUser = require('./user')
const routerCategory = require('./category')
const routerMarket = require('./market')
const routerProduct = require('./product')
const routerTransaction = require('./transaction')

router.use('/users', routerUser)
router.use('/categories', routerCategory)
router.use('/market', routerMarket)
router.use('/products', routerProduct)
router.use('/transaction', routerTransaction)

module.exports = router