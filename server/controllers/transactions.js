const Transaction = require("../models/transactions"),
  ObjectId = require("mongodb").ObjectId;

module.exports = {
  list: (req, res) => {
    Transaction.find()
      .populate("itemlist")
      .exec(function(err, transactions) {
        if (err) {
          res.status(500).json({
            message: err.message
          });
        } else {
          res.status(200).json({
            transactions: transactions
          });
        }
      });
  },

  getMyHistory: (req, res) => { //find history transaction per userID
    console.log("===>", req.decoded._id);

    Transaction.findMany({
      user: req.decoded._id
    })
      .populate("itemlist")
      .exec(function(err, transactions) {
        if (!err) {
          res.status(200).json({
            transactions: transactions
          });
        } else {
          res.status(500).json({
            message: err.message
          });
        }
      });
  },

  addToCart: (req, res) => {
    console.log(req.body)
    let trans = new Transaction({
      user: req.decoded._id,
      itemlist: req.body.itemlist
      // totalPrice: req.body.totalPrice
    });
    trans.save(function(err) {
      if (!err) {
        res.status(200).json({
          message: `succesfully made transaction`,
          trans
        });
      } else {
        res.status(500).json({
          message: err.message
        });
      }
    });
  },

  remove: (req, res) => {
    Transaction.deleteOne(
      {
        _id: ObjectId(req.params.id)
      },
      function(err) {
        if (!err) {
          res.status(200).json({
            message: `succesfully deleted transaction`
          });
        } else {
          res.status(500).json({
            message: err.message
          });
        }
      }
    );
  }
};
