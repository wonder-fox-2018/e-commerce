const User = require('../models/userModel.js');
const Cart = require('../models/cartModel.js');
const jwt = require('jsonwebtoken');
const encryptPassword = require('../helpers/encryptPassword.js');

class UserController {
    static register(req, res) {
        // encryptPassword(req.body);

        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: 'user'
        })
            .then(function(user) {
                Cart.create({user: user._id})
                    .then(function(cart) {
                        let pack = {
                            user: user,
                            cart: cart
                        };
                        res.status(200).json(pack);
                    })
                    .catch(function(err) {
                        res.status(500).json(err.message);
                    });
            })
            .catch(function(err) {
                res.status(500).json(err.message);
            });
    }

    static login(req, res) {
        // encryptPassword(req.body);

        User.findOne({
            email: req.body.email,
            password: req.body.password
        })
            .then(function(user) {
                if (user) {
                    const token = jwt.sign({id: user._id, name: user.name, email: user.email}, process.env.SECRET_TOKEN);
                    res.status(200).json({
                        token: token,
                        role: user.role
                    });
                } else {
                    const err = {
                        message: 'Validation error: Wrong username or password'
                    };

                    res.status(500).json(err.message);
                }
            })
            .catch(function(err) {
                res.status(500).json(err.message);
            });
    }

    static getUserProfile(req, res) {
        User.findOne({email: req.user.email}).populate('transactionList')
            .then(function(user) {
                res.status(200).json(user);
            })
            .catch(function(err) {
                res.status(500).json(err.message);
            });
    }
}

module.exports = UserController;