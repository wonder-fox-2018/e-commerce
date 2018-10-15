require('dotenv').config();
let hashPass = require("../helpers/hashPass");

const User = require("../models/users"),
  jwt = require('jsonwebtoken'),
  ObjectId = require("mongodb").ObjectId;

module.exports = {
  list: (req, res) => {
    User.find()
      .then(user => {
        res.status(200).json({
          user: user
        });
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        });
      });
  },

  insert: (req, res) => {
    if (!req.body.role) {
      req.body.role = 'User'
    }
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    })
      .then(() => {
        User.findOne({
          email: req.body.email,
          password: hashPass(req.body.password)
        })
        .then(user => {
            jwt.sign({
            id: user._id
            }, process.env.ACCESS_KEY,
            function (err, token) {
                res.status(200).json({
                name: user.name,
                role: user.role,
                token: token
                })
            }
            )
        })
        .catch(err => {
            res.status(500).json({
            message: `email and password didn't match`
            })
        })
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        });
      });
  },

  login: function(req, res) {
    User.findOne({
      email: req.body.email,
      password: hashPass(req.body.password)
    })
      .then(user => {
        console.log(user._id)
        jwt.sign({
          userId: user._id
        }, process.env.ACCESS_KEY,
          function(err, token) {
            res.status(200).json({
              name: user.name,
              role: user.role,
              token
            });
          }
        );
      })
      .catch(function() {
        res.status(500).json({
          message: `email and password didn't match`
        });
      });
  },

  update: (req, res) => {
    const upd = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    };
    User.updateOne(
      {
        _id: ObjectId(req.params.id)
      },
      upd,
      function(err) {
        if (!err) {
          res.status(200).json({
            message: `succesfully updated user: ${req.body.name}`
          });
        } else {
          res.status(500).json({
            message: err.message
          });
        }
      }
    );
  },

  remove: (req, res) => {
    User.deleteOne(
      {
        _id: ObjectId(req.params.id)
      },
      function(err) {
        if (!err) {
          res.status(200).json({
            message: `succesfully deleted user`
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
