const Transaction = require('../models/transaction');
const Cart = require('../models/cart');

module.exports = {
    create: (req, res) => {
        Cart.findOne({
            userId: req.decoded.id
        }).populate('list').then((cart) => {

            let groupedItemId = [];
            let total_price = 0;
            let purchasedItem = [];

            cart.list.forEach(currentItem => {
                total_price += currentItem.price;
                if (groupedItemId.indexOf(currentItem._id) === -1) {
                    groupedItemId.push(currentItem._id);

                    purchasedItem.push({
                        name: currentItem.name,
                        sub_total: currentItem.price,
                        qty: 1
                    });
                } else {
                    let index = groupedItemId.indexOf(currentItem._id);

                    purchasedItem[index].qty++;
                    purchasedItem[index].sub_total += currentItem.price;
                }
            });

            /* res.send({
                userId: req.decoded.id,
                purchased_item: purchasedItem,
                total_price: total_price
            }) */


            Transaction.create({
                userId: req.decoded.id,
                purchased_item: purchasedItem,
                total_price: total_price

            }).then((transaction) => {

                Cart.updateOne({
                    userId: req.decoded.id
                }, {
                    list: []
                }).then((result) => {

                    res.status(200).json(transaction);
                }).catch((err) => {
                    res.status(500).json(err);
                });
            }).catch((err) => {
                res.status(500).json(err);
            });
        }).catch((err) => {
            res.send(err);
        });
    }
};
