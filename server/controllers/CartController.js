var CartModel = require('../models/CartModel.js');

/**
 * CartController.js
 *
 * @description :: Server-side logic for managing Carts.
 */
module.exports = {

    /**
     * CartController.list()
     */
    list: function (req, res) {
        CartModel.find(function (err, Carts) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Cart.',
                    error: err
                });
            }
            return res.json(Carts);
        }).populate('cartcontent.Product').exec()
    },

    /**
     * CartController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        CartModel.findOne({_id: id}, function (err, Cart) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Cart.',
                    error: err
                });
            }
            if (!Cart) {
                return res.status(404).json({
                    message: 'No such Cart'
                });
            }
            return res.json(Cart);
        });
    },

    /**
     * CartController.create()
     */
    create: function (req, res) {
        var Cart = new CartModel({

			cartcontent : [],
			subTotal : 0,
			shipping : 0,
			tax : 0,
			total : 0,
			status : true

        });

        Cart.save(function (err, Cart) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Cart',
                    error: err
                });
            }
            return res.status(201).json(Cart);
        });
    },

    /**
     * CartController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        CartModel.findOne({_id: id}, function (err, Cart) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Cart',
                    error: err
                });
            }
            if (!Cart) {
                return res.status(404).json({
                    message: 'No such Cart'
                });
            }

            Cart.cartcontent = req.body.cartcontent ? req.body.cartcontent : Cart.cartcontent;
			Cart.subTotal = req.body.subTotal ? req.body.subTotal : Cart.subTotal;
			Cart.shipping = req.body.shipping ? req.body.shipping : Cart.shipping;
			Cart.tax = req.body.tax ? req.body.tax : Cart.tax;
			Cart.total = req.body.total ? req.body.total : Cart.total;
			Cart.status = req.body.status ? req.body.status : Cart.status;
			
            Cart.save(function (err, Cart) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Cart.',
                        error: err
                    });
                }

                return res.json(Cart);
            });
        });
    },

    /**
     * CartController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        CartModel.findByIdAndRemove(id, function (err, Cart) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Cart.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
