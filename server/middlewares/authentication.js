const UserModel = require("../models/UserModel.js");
const helpers = require("../helpers");
const ObjectId = require("mongoose").Types.ObjectId;
var request = require('request')
const jwt = require('jsonwebtoken')
const CartModel = require('../models/CartModel.js')

module.exports = {

    checkToken(req, res, next) {
        if (!req.headers.token) {
            res.status(401).json({
                message: "Unauthorized Access, please signin"
            });
        } else {
            next();
        }
    },

    checkifTokenValid(req, res, next) {
        let id;
        try {
            id = helpers.decodeToken(req.headers.token).id;

            UserModel.findById(ObjectId(id))
                .then(userFound => {
                    if (userFound) {
                        req.headers.userId = userFound._id;
                        next();
                    } else {
                        res.status(204).json({
                            message: "Invalid Token"
                        });
                    }
                })
                .catch(err => {
                    res.status(400).json({
                        message: err
                    });
                });

        } catch (err) {
            res.status(400).json({
                message: "Invalid Creditial"
            });
        }
    },

    verifyToken(req, res) {
        UserModel.findById(
                ObjectId(helpers.decodeToken(req.body.token).id)
            )
            .then(userFound => {
                if (userFound) {
                    res.status(200).json({
                        message: "OK",
                        data: {
                            name: userFound.name
                        }
                    });
                } else {
                    res.status(204).json({
                        message: "Not Found"
                    });
                }
            })
            .catch(err => {
                res.status(400).json({
                    message: err
                });
            });
    },

    login(req, res) {
        UserModel.findOne({
                username: req.body.username
            })
            .exec()
            .then((user) => {
                if (user && helpers.compareSync(req.body.password, user.password)) {
                    let token = helpers.createToken({
                        id: user._id.toString()
                    })
                    res.status(200).json({
                        message: "Login Success",
                        token: token
                    })
                } else if (user !== null && req.body.password !== user.password) {
                    res.status(400).json({
                        message: "Wrong Password"
                    })
                } else {
                    res.status(400).json({
                        message: "Wrong Username & Password"
                    })
                }
            })
            .catch(err => {
                res.status(402).json(err);
            });
    },


    glogin: (req, res) => {
        const {OAuth2Client} = require('google-auth-library');
        var clientId = "736311652491-j77r9uqltc9nucbensuiet5avlpb6046.apps.googleusercontent.com"
        const client = new OAuth2Client(clientId);

        return new Promise(function (resolve, reject) {
                client.verifyIdToken({
                    idToken: req.body.data,
                    audience: clientId
                }, function (e, login) {
                    if (login) {
                        var payload = login.getPayload();
                        var googleId = payload['sub'];
                        resolve(googleId);
                    } else {
                        reject("invalid token");
                    }
                })
            })
            .then(function (googleId) {

                request.get({
                        url: `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${req.body.data}`
                    },
                    (error, response, body) => {
                        if (!error) {

                            let userData = JSON.parse(body)
                            let email = userData.email
                            let name = userData.name

                            UserModel.findOne({
                                    email: email
                                })
                                .then((user) => {
                                    if (!user) {

                                        var Cart = new CartModel({
                                            cartcontent : [],
                                            subTotal : 0,
                                            shipping : 0,
                                            tax : 0,
                                            total : 0,
                                            status : true
                                
                                        });
                                
                                        Cart.save(function (err, Cart) {
                                            if (err) {
                                                return res.status(500).json({
                                                    message: 'Error when creating Cart',
                                                    error: err
                                                });
                                            }

                                            UserModel.create({
                                                username: name,
                                                email: email,
                                                role : 'customer',
                                                cart : Cart
                                            })
                                            .then((user) => {

                                                let token = jwt.sign({
                                                        id: user.id,
                                                        username: user.username,
                                                        email: user.email,
                                                        role : user.role
                                                    },
                                                    process.env.jwtsecret
                                                )

                                                res.status(200).json({
                                                    token: token
                                                })
                                            }).catch((err) => {
                                                res.status(500).json({
                                                    errors: err.message
                                                })
                                            });
                                            
                                        });



                                        
                                    } else {
                                        let token = jwt.sign({
                                                id: user.id,
                                                username: user.username,
                                                email: user.email,
                                                role: user.role
                                            },
                                            process.env.jwtsecret
                                        )

                                        res.status(200).json({
                                            token: token
                                        })
                                    }
                                }).catch((err) => {
                                    res.status(500).json({
                                        message: 'error retrieve databaseeee',
                                        errors: err
                                    })
                                });

                        } else {
                            res.status(500).json({
                                msg: error
                            });
                        }
                    }
                );

            }).catch(function (err) {
                //error
                console.log(err)
            })

    },
}