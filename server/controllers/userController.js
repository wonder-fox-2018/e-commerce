const User = require('../models/user')
const Transaction = require('../models/transaction')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

class UserController{
    static register(req, res){
        User.create({
            email : req.body.email,
            password : req.body.password,
            name : req.body.name,
            address : req.body.address,
            city : req.body.city,
            state : req.body.state,
            zip : req.body.zip
        })
        .then(user => {
            console.log(user)
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json({
                message : err.message
            })
        })

    }
    static registerAdmin(req, res){
        User.create({
            email : req.body.email,
            password : req.body.password,
            name : req.body.name,
            address : req.body.address,
            city : req.body.city,
            state : req.body.state,
            zip : req.body.zip,
            role : req.body.role
        })
        .then(user => {
            console.log(user)
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json({
                message : err.message
            })
        })

    }
    static signin(req, res){
        User.findOne({ email : req.body.email})
        .then(login => {
            let isPassValid = bcrypt.compareSync(req.body.password, login.password)
            console.log(isPassValid)
            if(isPassValid){
                let token = jwt.sign({
                    id : login.id,
                    email : login.email,
                    name : login.name,
                    isGoogle : login.isGoogle
                }, process.env.SECRET)
                res.status(200).json({
                    token : token,
                    message : 'Login Success'
                })
            }
            else{
                res.status(401).json({
                    message : 'Email & Password is incorrect'
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message : err.message
            })
        })
    }
    static googleSignin(req, res){

    }
    static showProfile(req, res){
        User.findOne({
            _id : req.login.id
        })
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json({
                message : err.message
            })
        })
    }
    static editProfile(req, res){
        User.update({_id : req.headers.id}, {
            email : req.body.email,
            password : req.body.password,
            name : req.body.name,
            address : req.body.address,
            city : req.body.city,
            state : req.body.state,
            zip : req.body.zip
        })
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json({
                message : err.message
            })
        })
    }
    static showAllUser(req, res){
        User.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({
                message : err.message
            })
        })
    }
    static checkout(req, res){
        User.findOne({_id : req.body.user_id})
        .then(user => {
            if(user._id == req.login.id){
                // res.send({login : req.login, user})
                Transaction.create({
                    user : req.body.user_id,
                    list_item : req.body.list_item,
                    total_item : req.body.total_item,
                    price_count : req.body.price_count
                })
                .then(checkout =>{
                    res.status(200).json(checkout)
                })
            }
            else{
                res.status(200).json({
                    message : 'u dont have permisson for this action'
                })
            }
        })
        .catch(err =>{
            res.status(500).json(err)
        })
    }
    static showUserCheckout(req, res){
        User.findOne({_id : req.params.id})
        .then(user => {
            if(user._id == req.login.id){
                // res.send(user)
                Transaction.find({})
                .then(checkout => {
                    res.status(200).json(checkout)
                })
            }
            else{
                res.status(200).json('you dont have permission for this action')
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
    static checkoutPerUser(req, res){
        User.findOne({_id : req.login.id})
        .then(user => {
                Transaction.find({user : req.login.id})
                .then(checkoutUser => {
                    res.status(200).json(checkoutUser)
                })
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = UserController