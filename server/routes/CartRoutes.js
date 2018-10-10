var express = require('express');
var router = express.Router();
var CartController = require('../controllers/CartController.js');

/*
 * GET
 */
router.get('/', CartController.list);

/*
 * GET
 */
router.get('/:id', CartController.show);

/*
 * POST
 */
router.post('/', CartController.create);

/*
 * PUT
 */
router.put('/:id', CartController.update);

/*
 * DELETE
 */
router.delete('/:id', CartController.remove);

module.exports = router;
