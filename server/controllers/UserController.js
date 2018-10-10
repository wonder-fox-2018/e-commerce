var UserModel = require('../models/UserModel.js');
const helpers = require('../helpers')
const CartController = require('./CartController.js')

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
        }).populate('cart').exec()
    },

    /**
     * UserController.show()
     */
    show: function (req, res) {
        var id = helpers.decodeToken(req.params.id).id

        UserModel.findOne({_id: id}, function (err, User) {
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
        }).populate('cart').exec()
    },

    /**
     * UserController.create()
     */
    create: function (req, res) {
        var User = new UserModel({
			username : req.body.username,
			email : req.body.email,
			password : helpers.hash(req.body.password),
			role : req.body.role,
			cart : CartController.create()

        });

        User.save(function (err, User) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating User',
                    error: err
                });
            } else {
                let token = helpers.createToken({
                    id: User._id.toString()
                })

                res.json({
                    message: "Register Success",
                    User,
                    token: token
                })
            }
            
        });
    },

    /**
     * UserController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        UserModel.findOne({_id: id}, function (err, User) {
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
