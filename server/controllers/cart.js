const Cart = require('../models/cart')

module.exports = {
  create : function(req,res){                 
    let itemId = []
    req.body.listItem.forEach(item => {
      itemId.push(item._id)
    });
    Cart.create({
      customer: req.body.id,
      listItem: itemId,
      totalTransaction : req.body.totalTransaction
    })
    .then(newCart =>{                                            
      res.status(200).json({
        Cart : newCart,
        msg : 'success add a new Cart'                    
      })
    })
    .catch(err =>{
      res.status(400).json(err)
    }) 
  },
  read : function(req,res){              
    Cart.find({
      customer : req.params.id
    })
    .populate('listItem')
    .then(newCart =>{                                            
      res.status(200).json({
        Cart : newCart,
        msg : 'list of all user cart'                    
      })
    })
    .catch(err =>{
      res.status(400).json(err)
    })                  
  },
  allCart : function(req,res){
    Cart.find({})
    .then(Carts =>{
      res.status(200).json(Carts)
    })
    .catch(err =>{
      res.status(400).json(err)
    })
  }
}