const router = require('express').Router()
const transactionController = require('../controllers/transactionController')

router.use('/create',transactionController.create)

module.exports = router