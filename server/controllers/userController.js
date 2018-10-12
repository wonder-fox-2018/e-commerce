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
            email,password,first_name,last_name
        }).then((user) => {
            Cart.create({userId: user._id}).then((result) => {
                res.json(user);
            }).catch((err) => {
                
            });
        }).catch((err) => {
            res.json(err);
        });


        /* Cart.create({}).then((cart) => {
            let {email, password, first_name, last_name} = req.body;

            User.create({
                email,
                password,
                first_name,
                last_name,
                cart:cart
            }).then((user) => {
                res.json(user)
            }).catch((err) => {
                
            });
        }).catch((err) => {
            res.status(500);
        }); */
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

                res.status(200).json(token);
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
