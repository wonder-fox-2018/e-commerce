const Category = require('../models/category');

module.exports = {
    create: (req, res) => {
        console.log(req.body.name);
        Category.create({
            name: req.body.name
        }).then((category) => {
            res.status(200).json(category);
        }).catch((err) => {
            res.status(500).json(err);
        });
    },
    addItem: (req, res) => {

       Category.updateOne({_id: req.params.id}, {
           $push: {items: req.body.itemId}
       }).then((result) => {
           res.status(200).json(result);
       }).catch((err) => {
           res.status(500).json(err);
       }); 
    },

    showCategory: (req, res) => {
        Category.findOne({name: req.params.name}).then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err);
        });
    }
};
