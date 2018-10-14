const Item = require('../models/item')

class Controller {
    static create(req, res) {
        
        let newItem = new Item({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            img : req.body.img,
            category: req.body.categoryId
        })

        newItem.save()
            .then(function () {
                res.status(200).json({
                    message: `add item success`
                })
            })
            .catch(function () {
                res.status(500).json({
                    message: `add item failed`
                })
            })
    }

    static read(req, res) {
        Item.find()
            // .populate('category')
            .then(function (items) {
                res.status(200).json({
                    items
                })
            })
    }

    static update(req,res){
        
    }
}

module.exports = Controller;