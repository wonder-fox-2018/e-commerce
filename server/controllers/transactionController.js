const Cart = require('../models/cartModel.js');
const Transaction = require('../models/transactionModel.js');

class TransactionController {
    static create(req, res) {
        Cart.findOne({user: req.user._id})
            .then(function(cart) {
                let totalPrice = 0;

                for (let i = 0; i < cart.itemList.length; i++) {
                    totalPrice += cart.itemList[i].subTotal;
                }

                Transaction.create({
                    user: req.user._id,
                    itemList: cart.itemList,
                    totalPrice: totalPrice
                })
                    .then(function(transaction) {
                        Cart.updateOne({
                            user: req.user._id
                        }, {
                            "$set": {"itemList": []}
                        }, {safe: true, multi: true})
                            .then(function(result) {
                                res.status(200).json(transaction);
                            })
                            .catch(function(err) {
                                res.status(500).json(err.message);
                            });
                    })
                    .catch(function(err) {
                        res.status(500).json(err.message);
                    });
            })
            .catch(function(err) {
                res.status(500).json(err.message);
            });
    }
}

module.exports = TransactionController;