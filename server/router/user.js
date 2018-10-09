var express = require('express');
var router = express.Router();
var User=require('../model/user')

router.post('/',function(req,res){
    let newUser = {
        name: req.body.name,
        email: req.body.email,
        password:req.body.password
    }

    User.create(newUser)
        .then((data) => {
            res.status(201).json({message: 'User created!'})
        })
        .catch(err => {
            res.status(500).json({error: err.message})
        })
})

router.get('/',function(req,res){
    User.find()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({error: err.message})
            })
})

router.delete('/',function(req,res){
    User.deleteOne({_id: req.body.id})
    .then(() => {
        res.status(200).json({message: 'User deleted!'})
    })
    .catch(err => {
        res.status(500).json({error: err.message})
    })
})

module.exports=router