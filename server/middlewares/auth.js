const User = require("../models/users"),
  jwt = require("jsonwebtoken")

module.exports = {
  isLogin: function(req, res, next) {
    let token = req.headers.token;
    if (token) {
      jwt.verify(token, process.env.ACCESS_KEY, function(err, decoded) {
        if (!err) {
          User.findById(decoded.userId)
            .then(user => {
              console.log('middleware', user)
              req.decoded = user
              next();
            })
            .catch(function() {
              res.status(500).json({
                message: `access denied`
              });
            });
        } else {
          res.status(500).json({
            message: `access denied`
          });
        }
      });
    }
  },

  isAdmin: function(req, res, next) {
    if (req.decoded.role === 'Admin') {
      next()
    }
    else {
        res.status(403).json({
            message: 'you are unauthorized'
        })
    }
  }
};
