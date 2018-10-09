const bcrypt = require('bcrypt')

// console.log(hash('123'))
module.exports = {
  hash: function(password) {
      var salt = bcrypt.genSaltSync(10);
      return bcrypt.hashSync(password, salt);
  },
  decodePass: function(dbPass, loginPass) {
    return bcrypt.compareSync(loginPass, dbPass)
  }
  
}