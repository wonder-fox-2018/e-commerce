const Product = require("../models/product");

function checkMarket(markets) {
  return new Promise((resolve, reject) => {
    let tempMarket = [];

    for (let i = 0; i < markets.length; i++) {
      Product.findById(markets[i][0])
        .populate("market", "_id")
        .then(product => {
          let trigger = true;

          for (let k = 0; k < tempMarket.length; k++) {
            if (String(tempMarket[k]) == String(product.market._id)) {
              trigger = false;
            }
          }

          if (trigger) {
            tempMarket.push(product.market._id);
          }

          if (i == markets.length - 1) {
            resolve(tempMarket);
          }
        });
    }
  });
}

function updateProduct(products) {
  return new Promise((resolve, reject) => {
    let tempProduct = [];
    let dataProduct = [];
    let subTotalPrice = 0;

    if (typeof products == "object" && products.length >= 1) {
      for (let i = 0; i < products.length; i++) {
        Product.findById(products[i][0]).then(product => {
          let totalPrice = product.price * products[i].length;
          let totalItem = products[i].length;
          let name = product.name;

          tempProduct.push({ name, totalItem, totalPrice });

          subTotalPrice += totalPrice;

          Product.update(
            { _id: product._id },
            { stock: product.stock - totalItem }
          )
            .then(() => {
              if (i === products.length - 1) {
                checkMarket(products).then(market => {
                  resolve({ tempProduct, subTotalPrice, market });
                });
              }
            })
            .catch(() => {});
        });
      }
    } else {
      Product.findById(products._id)
        .populate("market")
        .then(product => {
          let totalPrice = product.price * 1;
          let totalItem = 1;
          let name = product.name;
          let subTotalPrice = totalPrice;

          tempProduct.push({ name, totalItem, totalPrice });
          marketId = product.market._id;

          Product.update(
            { _id: product._id },
            { stock: product.stock - totalItem }
          )
            .then(() => {})
            .catch(() => {});

          resolve({ tempProduct, marketId, subTotalPrice });
        });
    }
  });
}

module.exports = updateProduct;
