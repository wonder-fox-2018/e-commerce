const Cart = require('../models/cart');
const mongoose = require('mongoose');

module.exports = {
    create: (req, res) => {
        Cart.create({
            
        }).then((cart) => {
            res.status(200).json(cart)
        }).catch((err) => {
            res.status(500).json(err);
        });
    },

    getCart: (req, res) => {
        Cart.findOne({userId: req.decoded.id}).populate('userId list').exec().then((cart) => {
            res.status(200).json(cart);
        }).catch((err) => {
            res.status(500).json(err);
        });
    },

    addItemToCart: (req, res) => {
        Cart.updateOne({userId: req.decoded.id}, {
            $push: {list: mongoose.Types.ObjectId(req.params.id)}
        }).then((cart) => {
            res.status(200).json(cart);
        }).catch((err) => {
            res.status(500).json(err);
        });
    }
};
