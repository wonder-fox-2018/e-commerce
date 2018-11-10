const Item = require('../models/item')

module.exports = {
  read: function(req, res) {
    Item.find({})
    .then(items=>{
      res.status(200).json({items:items})
    })
    .catch(err=>{
      res.status(500).json({err:err})
    })
  },

  create: function(req, res) {
    Item.create({
      name: req.body.name,
      category: req.body.category,
      quantity: req.body.quantity,
      price: req.body.price
    })
    .then((result) => {
      res.status(200).json({result:result})
    }).catch((err) => {
      res.status(500).json({err:err})
    });
  },
  findById: function(req, res) {
    Item.findById(req.params.id)
    .then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      res.status(500).json({err})
    });
  },
  update: function(req, res) {
    Item.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      category: req.body.category,
      quantity: req.body.quantity,
      price: req.body.price,
      image_url: req.body.image_url
    })
    .then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      res.status(500).json({err})
    });
  },
  delete: function(req, res) {
    Item.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      res.status(500).json({err})
    });
  }
}