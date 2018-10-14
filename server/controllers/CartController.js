var CartModel = require('../models/CartModel.js');
var mongoose = require('mongoose')

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
        let id = mongoose.Types.ObjectId(req.params.id)
        
        CartModel.findOne({_id:id}, function(error, doc) {
           
            res.json({data :doc})
          })
    },

    /**
     * CartController.create()
     */
    create: function (req, res) {
        var Cart = new CartModel({

            cartcontent: [],
            subTotal: 0,
            shipping: 0,
            tax: 0,
            total: 0,
            status: true

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

        CartModel.findById(id, function (err, Cart) {
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

            Cart.cartcontent = req.body.data.cartcontent ? req.body.data.cartcontent : Cart.cartcontent;
            Cart.subTotal = req.body.data.subTotal ? req.body.data.subTotal : Cart.subTotal;
            Cart.shipping = req.body.data.shipping ? req.body.data.shipping : Cart.shipping;
            Cart.tax = req.body.data.tax ? req.body.data.tax : Cart.tax;
            Cart.total = req.body.data.total ? req.body.data.total : Cart.total;
            Cart.status = req.body.data.status ? req.body.data.status : Cart.status;

            CartModel.update({
                    _id: id
                }, Cart)
                .then((result) => {
                    return res.json(result);
                }).catch((err) => {

                    return res.status(500).json({
                        message: 'Error when updating Cart.',
                        error: err
                    });
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