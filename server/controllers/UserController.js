var UserModel = require('../models/UserModel.js');
const helpers = require('../helpers')
const CartController = require('./CartController.js')
const CartModel = require('../models/CartModel.js')
const jwt = require('jsonwebtoken')
/**
 * UserController.js
 *
 * @description :: Server-side logic for managing Users.
 */
module.exports = {

    /**
     * UserController.list()
     */
    list: function (req, res) {
        UserModel.find(function (err, Users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting User.',
                    error: err
                });
            }
            return res.json(Users);
        }).populate({
            path: 'cart',
            model: 'Cart',
            populate: {
                path: 'cartcontent',
                model: 'Product'
            }
        }).exec()
    },

    /**
     * UserController.show()
     */
    show: function (req, res) {
        var id = helpers.decodeToken(req.params.id).id

        UserModel.findOne({
            _id: id
        }, function (err, User) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting User.',
                    error: err
                });
            }
            if (!User) {
                return res.status(404).json({
                    message: 'No such User'
                });
            }
            return res.json(User);
        }).populate({
            path: 'cart'
        }).exec()
    },

    /**
     * UserController.create()
     */
    create: function (req, res) {

        var Cart = new CartModel({
            cartcontent: [],
            subTotal: 0,
            shipping: 0,
            tax: 0,
            total: 0,
            status: true

        });

        Cart.save(function (err, Cart) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Cart',
                    error: err
                });
            }

            var User = new UserModel({
                username: req.body.username,
                email: req.body.email,
                password: helpers.hash(req.body.password),
                role: req.body.role,
                cart: Cart

            });

            UserModel.create(User)
                .then((user) => {
                    let token = jwt.sign({
                            id: user.id,
                            username: user.username,
                            email: user.email,
                            role: user.role
                        },
                        process.env.jwtsecret
                    )
                        console.log(token)
                    res.status(200).json({
                        token: token
                    })
                }).catch((err) => {
                    res.status(500).json({
                        errors: err.message
                    })
                });

        });

    },

    /**
     * UserController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        UserModel.findOne({
            _id: id
        }, function (err, User) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting User',
                    error: err
                });
            }
            if (!User) {
                return res.status(404).json({
                    message: 'No such User'
                });
            }

            User.username = req.body.username ? req.body.username : User.username;
            User.email = req.body.email ? req.body.email : User.email;
            User.password = req.body.password ? req.body.password : User.password;
            User.role = req.body.role ? req.body.role : User.role;
            User.cart = req.body.cart ? req.body.cart : User.cart;

            User.save(function (err, User) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating User.',
                        error: err
                    });
                }

                return res.json(User);
            });
        });
    },

    /**
     * UserController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        UserModel.findByIdAndRemove(id, function (err, User) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the User.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};