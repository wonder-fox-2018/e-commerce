const Item = require('../models/item')

class Controller {

    static create(req,res) {
        const item = new Item({
            name:  req.body.name,
            quantity: req.body.quantity,
            price: req.body.price,
            rating: req.body.rating,
            image: req.body.image,
            category: req.body.category
        })
    
        item.save(function (err, item) {
            if (err) {
                console.log(err);
                res.status(500).json({
                    message: err
                })
            }

            else {
                console.log(item);
                res.status(200).json({
                    message: `Item ${req.body.name} has been added to database!`
                })
            }
        })
    }

    static findAll(req,res) {
        Item.find(function(err, items) {
            if (err) {
                console.log(err);               
                res.status(500).json({
                    message: err
                })
            }
            else {
                res.status(200).json({
                    items: items
                })
            }
        })
    }

    static update(req,res) {
        Item.updateOne({_id: req.params.id }, {$set: {
            name:  req.body.name,
            quantity: req.body.quantity,
            price: req.body.price,
            rating: req.body.rating,
            image: req.body.image,
            category: req.body.category
        }}, 
        function(err) {
            if (err) {
                console.log(err);              
                res.status(500).json({
                    message: err
                })
            }
            else {
                res.status(200).json({
                    message: `Item has been successfully updated.`
                })
            }
        })
    }

    static remove(req,res) {
        Item.deleteOne({_id: req.params.id}, function(err) {
            if (err) {
                console.log(err);
                res.status(500).json({
                    message: err
                })
            }
            else {
                res.status(200).json({
                    message: `Item has been successfully deleted!`
                })
            }
        })
    }

}

module.exports = Controller
