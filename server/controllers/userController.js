require('dotenv').config();
const axios = require('axios');
const User = require('../models/user');
const ServerResponse = require('../helpers/serverResponse');
const Token = require('../helpers/token');
const encryptPassword = require('../helpers/encryptPassword');
const Cart = require('../models/cart');

module.exports = {
    register: (req, res) => {


        req.body.password = encryptPassword(req.body.password);

        let {email, password, first_name, last_name} = req.body;

        User.create({
            email,password,first_name,last_name, admin : false
        }).then((user) => {
            Cart.create({userId: user._id}).then((result) => {
                res.status(200).json(result);
            }).catch((err) => {
                res.status(500).json(err);
            });
        }).catch((err) => {
            res.json(err);
        });

    },

    registerAdmin: (req, res) => {

        req.body.password = encryptPassword(req.body.password);

        let {email, password, first_name, last_name} = req.body;

        User.create({
            email,password,first_name,last_name, admin : true
        }).then((user) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.json(err);
        });
    },

    login: (req, res) => {
        req.body.password = encryptPassword(req.body.password);
        let {
            email,
            password
        } = req.body;

        User.findOne({
            email,
            password
        }).then((user) => {

            if (user) {
                let token = Token.sign(user);

                res.status(200).json({
                    token: token,
                    admin: user.admin
                });
            } else {

                ServerResponse.error(res, 401, {
                    message: 'unable to find the user'
                });
            }

        }).catch((err) => {

            ServerResponse.error(res, 500, err);

        });

    },

    findById: (req, res) => {
        User.findById(req.decoded.id).populate('cart').exec().then((user) => {
            res.status(200).json(user);
        }).catch((err) => {
            ServerResponse.error(res, 500, err);
        });
    }
};
