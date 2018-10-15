const router = require('express').Router()
const Controller = require('../controllers/categoryController')

router.post('/create', Controller.create)
router.get('/findAll', Controller.findAll)
// router.put('/update', Controller.update)
// router.put('/delete', Controller.remove)

module.exports = router