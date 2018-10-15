function changeCartFromClient(productId) {
  let tempCarts = [];

  for (let i = 0; i < productId.length; i++) {
    for (let j = 0; j < productId[i].length; j++) {
      tempCarts.push(productId[i][j]._id);
    }
  }

  return tempCarts;
}

module.exports = changeCartFromClient;
