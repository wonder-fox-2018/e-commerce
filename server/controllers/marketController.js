const Market = require("../models/market");
const User = require("../models/user");
const Transaction = require("../models/transaction");
const Product = require("../models/product");

module.exports = {
  findMarketUser: function(req, res) {
    Market.findOne({ user: req.userId })
      .populate("user", "name")
      .populate({ path: "transactions", populate: { path: "user" } })
      .populate("products")
      .then(market => {
        res.status(200).json({ market });
      })
      .catch(err => {
        res.status(404).json({ err, message: `market not found` });
      });
  },

  findProductOnMarket: function(req, res) {
    Market.findById(req.marketId)
      .populate({ path: "products", populate: { path: "category" } })
      .then(market => {
        res.status(200).json({ market });
      })
      .catch(err => {
        res.status(404).json({ err, message: `market not found` });
      });
  },

  create: function(req, res) {
    let dataMarket = new Market({
      user: req.userId,
      name: req.body.name
    });

    dataMarket
      .save()
      .then(market => {
        User.findByIdAndUpdate(req.userId, { marketAvailable: true })
          .then(() => {})
          .catch(() => {});

        res.status(200).json({
          market,
          message: `create ${req.body.name} success`
        });
      })
      .catch(err => {
        res.status(500).json({
          err,
          message: `create ${req.body.name} failed`
        });
      });
  }
};
