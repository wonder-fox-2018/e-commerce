const User = require("../models/user");
const jwt = require("jsonwebtoken");
const checkPassword = require("../helpers/checkPassword");

module.exports = {
  signup: function(req, res) {
    let dataUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    dataUser
      .save()
      .then(result => {
        res.status(200).json({
          message: "signup success"
        });
      })
      .catch(err => {
        res.status(500).json({
          err
        });
      });
  },

  signin: function(req, res) {
    let user = null;

    User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }]
    })
      .then(function(dataUser) {
        if (dataUser) {
          user = dataUser;
          return checkPassword(user.password, req.body.password, user.email);
        } else {
          res.status(404).json({
            message: `Email and password didn't match`
          });
        }
      })
      .then(function() {
        jwt.sign(
          {
            userId: user._id,
            username: user.username
          },
          process.env.DATA_ACCESS,
          function(err, token) {
            if (!err) {
              res.status(200).json({
                name: user.name,
                username: user.username,
                email: user.email,
                statusMarket: user.marketAvailable,
                token: token
              });
            } else {
              res.status(500).json({
                message: `Token not valid`
              });
            }
          }
        );
      })
      .catch(function() {
        res.status(500).json({
          message: `Email and password didn't match`
        });
      });
  }
};
