const router = require('express').Router()
const itemController = require('../controllers/itemController')

router.post('/create',itemController.create)
router.get('/',itemController.read)
router.get('/edit/:id',itemController.edit)
router.put('/update/:id',itemController.update)
router.delete('/delete/:id',itemController.delete)

module.exports = router;