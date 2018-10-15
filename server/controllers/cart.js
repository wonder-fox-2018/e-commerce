const Cart = require('../models/cart')

module.exports = {
  create : function(req,res){               
    let itemId = []
    req.body.carts.forEach(item => {
      itemId.push(item._id)
    });
    Cart.create({
      customer: req.body.id,
      items: itemId,
      total : req.body.totalTransaction
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
  findById : function(req,res){              
    Cart.find({
      customer : req.params.id
    })
    .populate('items')
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
  read : function(req,res){
    Cart.find({})
    .populate('items')
    .populate('customer')
    .then(Carts =>{
      res.status(200).json(Carts)
    })
    .catch(err =>{
      res.status(400).json(err)
    })
  }
}