const Cart = require('../models/cartModel.js');
const Item = require('../models/itemModel.js');
const mongoose = require('mongoose');

class CartController {
    static addItem(req, res) {
        Cart.findOne({user: req.user._id})
            .then(function(cart) {
                let itemId = mongoose.Types.ObjectId(req.params.id);

                const result = cart.itemList.filter(function (datum) {
                    return itemId.equals(datum.item);
                });

                if (result.length === 0) {
                    Item.findById(req.params.id)
                        .then(function(item) {
                            Cart.updateOne({user: req.user._id}, {
                                $push: {
                                    itemList: {
                                        item: item._id,
                                        qty: 1,
                                        subTotal: item.price
                                    }
                                }
                            })
                                .then(function(result) {
                                    res.status(200).json(result);
                                })
                                .catch(function(err) {
                                    res.status(500).json(err.message);
                                });
                        })
                        .catch(function(err) {
                            res.status(200).json(err.message);
                        });
                } else if (result.length === 1) {
                    Item.findById(result[0].item)
                        .then(function(item) {
                            Cart.update({
                                'user': req.user._id,
                                'itemList.item': item._id
                            }, {
                                '$set': {
                                    'itemList.$.qty': result[0].qty + 1,
                                    'itemList.$.subTotal': result[0].subTotal + item.price
                            }}, function(err, result) {
                                if (err) {
                                    console.log(err);
                                }
                                console.log(result);
                            })
                        })
                        .catch(function(err) {
                            console.log(err.message);
                        });
                }
            })
            .catch(function(err) {
                res.status(500).json(err.message);
            });
    }

    static showCart(req, res) {
        Cart.findOne({user: req.user._id}).populate('itemList.item')
            .then(function(cart) {
                res.status(200).json(cart);
            })
            .catch(function(err) {
                res.status(500).json(err.message);
            });
    }

    static removeItem(req, res) {
        let itemId = mongoose.Types.ObjectId(req.params.id);

        Cart.updateOne({user: req.user._id}, {
            "$pull": {"itemList": {"item": itemId}}
        }, {safe: true, multi: true})
            .then(function(result) {
                res.status(200).json(result);
            })
            .catch(function(err) {
                res.status(500).json(err.message);
            });
    }

    static emptyCart(req, res) {
        Cart.updateOne({
            user: req.user._id
        }, {
            "$set": {"itemList": []}
        }, {safe: true, multi: true})
            .then(function(result) {
                res.status(200).json(result);
            })
            .catch(function(err) {
                res.status(500).json(err.message);
            });
    }

    static getTotalPrice(req, res) {
        Cart.findOne({user: req.user._id})
            .then(function(cart) {
                let totalPrice = 0;

                for (let i = 0; i < cart.itemList.length; i++) {
                    totalPrice += cart.itemList[i].subTotal;
                }

                res.status(200).json({
                    totalPrice: totalPrice
                });
            })
            .catch(function(err) {
                res.status(500).json(err.message);
            });
    }
}

module.exports = CartController;