const User = require("../models/user");
const Transaction = require("../models/transaction");
const checkCountProduct = require("../helpers/checkCountProduct");
const updateProduct = require("../helpers/updateProductBytransaction");
const changeCartFromClient = require("../helpers/changeCartFromClient");
// const transactionForMarket = require("../helpers/transactionForMarket");

module.exports = {
  userTransaction: function(req, res) {
    User.findById(req.userId)
      .populate({
        path: "transactions",
        populate: { path: "market" }
      })
      .then(user => {
        res.status(200).json({ user });
      })
      .catch(err => {
        res.status(404).json({ err, message: `Transaction not found` });
      });
  },

  create: function(req, res) {
    let dataCarts = changeCartFromClient(req.body.products);
    checkCountProduct(dataCarts)
      .then(products => {
        // transactionForMarket(products, req.userId);
        return updateProduct(products);
      })
      .then(transaction => {
        let dataTransaction = new Transaction({
          products: transaction.tempProduct,
          subTotalPrice: transaction.subTotalPrice,
          user: req.userId,
          market: transaction.market
        });
        dataTransaction
          .save()
          .then(transaction => {
            res.status(200).json({ message: "Transaction success" });
          })
          .catch(err => {
            res.status(500).json({
              err,
              message: "create transaction failed"
            });
          });
      })
      .catch(err => {
        res.status(500).json({ err: err.message });
      });
  }
};
