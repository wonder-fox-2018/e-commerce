const Product = require("../models/product");

function sameProductId(products) {
  let tempProduct = [];

  for (let i = 0; i < products.length; i++) {
    let trigger = true;

    for (let j = 0; j < tempProduct.length; j++) {
      if (products[i] == tempProduct[j][0]) {
        tempProduct[j].push(products[i]);
        trigger = false;
      }
    }

    if (trigger) {
      tempProduct.push([products[i]]);
    }
  }
  return tempProduct;
}

function checkCountProduct(products) {
  if (typeof products == "object") {
    return new Promise((resolve, reject) => {
      let listProduct = sameProductId(products);
      for (let i = 0; i < listProduct.length; i++) {
        Product.findById(listProduct[i][0])
          .then(product => {
            if (product.stock >= listProduct[i].length && product.stock != 0) {
              if (i == listProduct.length - 1) {
                resolve(listProduct);
              }
            } else {
              reject({
                message: "transaction failed"
              });
            }
          })
          .catch(err => {});
      }
    });
  } else {
    return new Promise((resolve, reject) => {
      Product.findById(products)
        .then(product => {
          if (product.stock >= 1) {
            resolve(product);
          } else {
            reject({
              message: "transaction failed"
            });
          }
        })
        .catch(err => {});
    });
  }
}

module.exports = checkCountProduct;
