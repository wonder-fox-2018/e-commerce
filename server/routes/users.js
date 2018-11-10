var express = require('express');
var router = express.Router();
const Controller = require('../controllers/customer')

/* GET customers listing. */
router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.get('/', Controller.read);
// router.post('/', Controller.create);
// router.put('/:id', Controller.update);
// router.delete('/:id', Controller.delete)

module.exports = router;
