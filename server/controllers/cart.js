const Cart = require('../models/cart')

class Controller {

    static addCart(req,res) {
        const cart = new Cart({
            list: req.body.item
        })
    
        cart.save(function (err, cart) {
            if (err) {
                console.log(err);
                res.status(500).json({
                    message: err
                })
            }

            else {
                console.log(cart);
                res.status(200).json({
                    message: `Cart ${req.body.name} has been added to database!`
                })
            }
        })
    }

    static findAll(req,res) {
        Cart.find(function(err, carts) {
            if (err) {
                console.log(err);               
                res.status(500).json({
                    message: err
                })
            }
            else {
                res.status(200).json({
                    carts: carts
                })
            }
        })
    }


    static remove(req,res) {
        Cart.deleteOne({_id: req.params.id}, function(err) {
            if (err) {
                console.log(err);
                res.status(500).json({
                    message: err
                })
            }
            else {
                res.status(200).json({
                    message: `Cart has been successfully deleted!`
                })
            }
        })
    }

}

module.exports = Controller
