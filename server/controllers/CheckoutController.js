var CheckoutModel = require('../models/CheckoutModel.js');

module.exports = {

    list: function (req, res) {
        CheckoutModel.find(function (err, Checkouts) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Checkout.',
                    error: err
                });
            }
            return res.json(Checkouts);
        });
    },

    show: function (req, res) {
        var id = req.params.id;
        CheckoutModel.findOne({_id: id}, function (err, Checkout) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Checkout.',
                    error: err
                });
            }
            if (!Checkout) {
                return res.status(404).json({
                    message: 'No such Checkout'
                });
            }
            return res.json(Checkout);
        });
    },

    create: function (req, res) {
        var Checkout = new CheckoutModel({
			user : req.body.user,
			cart : req.body.cart

        });

        Checkout.save(function (err, Checkout) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Checkout',
                    error: err
                });
            }
            return res.status(201).json(Checkout);
        });
    },

    update: function (req, res) {
        var id = req.params.id;
        CheckoutModel.findOne({_id: id}, function (err, Checkout) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Checkout',
                    error: err
                });
            }
            if (!Checkout) {
                return res.status(404).json({
                    message: 'No such Checkout'
                });
            }

            Checkout.user = req.body.user ? req.body.user : Checkout.user;
			Checkout.cart = req.body.cart ? req.body.cart : Checkout.cart;
			
            Checkout.save(function (err, Checkout) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Checkout.',
                        error: err
                    });
                }

                return res.json(Checkout);
            });
        });
    },

    remove: function (req, res) {
        var id = req.params.id;
        CheckoutModel.findByIdAndRemove(id, function (err, Checkout) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Checkout.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
