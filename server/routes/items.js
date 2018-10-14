const router = require('express').Router()
const itemController = require('../controllers/itemController')

router.post('/create',itemController.create)
router.get('/',itemController.read)
router.put('/update/:id',itemController.update)

module.exports = router;