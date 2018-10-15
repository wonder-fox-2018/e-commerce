const Product = require("../models/product");
const Transaction = require("../models/transaction");
const Market = require("../models/market");

function checkMarket(markets) {
  return new Promise((resolve, reject) => {
    let tempMarket = [];

    let lastCheck = 0;
    for (let i = 0; i < markets.length; i++) {
      Product.findById(markets[i][0])
        .populate("market", "_id")
        .then(product => {
          // console.log(product);
          lastCheck++;
          let trigger = true;

          for (let k = 0; k < tempMarket.length; k++) {
            if (String(tempMarket[k]) == String(product.market._id)) {
              trigger = false;
            }
          }

          if (trigger) {
            tempMarket.push(product.market._id);
          }

          if (lastCheck == markets.length) {
            resolve(tempMarket);
          }
        });
    }
  });
}

function updateProduct(products, idUser) {
  checkMarket(products).then(market => {
    for (let i = 0; i < market.length; i++) {
      let subTotalPrice = 0;
      let tempIdTransaction = [];
      let trigger = 0;
      for (let j = 0; j < products.length; j++) {
        Product.findById(products[j][0])
          .populate("market", "_id")
          .then(product => {
            if (String(market[i]) == String(product.market._id)) {
              let totalPrice = product.price * products[j].length;
              let totalItem = products[j].length;
              let name = product.name;
              subTotalPrice += totalPrice;
              let tempProduct = { name, totalItem, totalPrice };

              if (trigger == 0) {
                trigger++;
                tempIdTransaction.push(
                  Transaction.create({
                    products: tempProduct,
                    subTotalPrice: subTotalPrice,
                    user: idUser,
                    market: market[i]
                  })
                    .then(result => {})
                    .catch(err => {})
                );
              }

              if (trigger > 0) {
                console.log(tempIdTransaction);
              }
            }
          });
      }
    }
  });
}

function transactionForMarket(products, idUser) {
  updateProduct(products, idUser);
}

module.exports = transactionForMarket;
