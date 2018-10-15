const Customer = require('../models/customer')
const Crypt = require('./helpers/hash')
const jwt = require('jsonwebtoken')

module.exports = {
  read: function(req, res) {
    Customer.find({})
    .then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      res.status(500).json(err)
    });
  },
  register: function(req, res) {
    Customer.create({
      name: req.body.name,
      email: req.body.email,
      password: Crypt.hash(req.body.password),
      role: req.body.role
    })
    .then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      res.status(500).json(err)
    });
  },
  login: function(req, res) {
    Customer.findOne({
      email:req.body.email
    })
    .then((result) => {
      if (result === null) {
        res.status(404).json({err:'Email is incorrect!'})
      }
      else if (Crypt.decodePass(result.password, req.body.password)) {
        let payload = {id:result._id, email:result.email}
        // console.log(payload, '===', result)
        let token = jwt.sign(payload, process.env.jwt_key)
        res.status(200).json({result:result,token:token})
      } else {
        res.status(404).json({err:'Password is incorrect!'})
      } 
    }).catch((err) => {
      res.status(500).json(err)
    });
  }

}