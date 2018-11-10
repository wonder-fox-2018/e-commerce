const Item = require('../models/itemModel.js');
const Category = require('../models/categoryModel.js');

class ItemController {
    static add(req, res) {
        Category.findOne({name: req.body.category})
            .then(function(category) {
                Item.create({
                    name: req.body.name,
                    price: req.body.price,
                    stock: req.body.stock,
                    imgURL: req.body.imgURL,
                    category: category._id
                })
                    .then(function(item) {
                        Category.updateOne({_id: category._id}, {
                            $push: {
                                itemList: item._id
                            }
                        })
                            .then(function(result) {
                                res.status(201).json({
                                    success: true,
                                    message: `Successfully added item ${item.name} to category ${category.name}`,
                                    category: category._id
                                });
                            })
                            .catch(function(err) {
                                console.log('Push Item To ItemList In Category Error: ', err);
                                res.status(500).json(err);
                            });
                    })
                    .catch(function(err) {
                        console.log('Add Item Error: ', err);
                        res.status(500).json(err);
                    });
            })
            .catch(function(err) {
                console.log('Find Category While Adding Item Error: ', err);
                res.status(500).json(err);
            });
    }

    static showAll(req, res) {
        Item.find().populate('category')
            .then(function(items) {
                res.status(200).json(items);
            })
            .catch(function(err) {
                res.status(500).json(err.message);
            });
    }

    static findWithId(req, res) {
        Item.findById(req.params.id)
            .then(function(item) {
                res.status(200).json(item);
            })
            .catch(function(err) {
                res.status(500).json(err.message);
            });
    }

    static update(req, res) {
        Category.findOne({name: req.body.category})
            .then(function(category) {
                Item.findById(req.params.id)
                    .then(function(item) {
                        if (item) {
                            let oldCategory = item.category;

                            item.name = req.body.name;
                            item.price = req.body.price;
                            item.stock = req.body.stock;
                            item.imgURL = req.body.imgURL;
                            item.category = category._id;

                            item.save()
                                .then(function(updateItemResult) {
                                    Category.updateOne({_id: category._id}, {
                                        $push: {
                                            itemList: item._id
                                        }
                                    })
                                        .then(function(pushCategoryResult) {
                                            Category.updateOne({_id: oldCategory}, {
                                                $pull: {
                                                    itemList: item._id
                                                }
                                            })
                                                .then(function(pullCategoryResult) {
                                                    res.status(201).json({
                                                        success: true,
                                                        message: `Successfully added item ${item.name} to category ${category.name}`,
                                                        category: category._id
                                                    });
                                                })
                                                .catch(function(err) {
                                                    console.log('Pull Item From ItemList In Category Error: ', err);
                                                    res.status(500).json(err);
                                                });
                                        })
                                        .catch(function(err) {
                                            console.log('Push Item To ItemList In Category Error: ', err);
                                            res.status(500).json(err);
                                        });
                                })
                                .catch(function(err) {
                                    console.log('Update Item Error: ', err);
                                    res.status(500).json(err);
                                });
                        } else {
                            res.status(404).json({
                                message: 'Item not found'
                            });
                        }
                    })
                    .catch(function(err) {
                        console.log('Find Item While Updating Error: ', err);
                        res.status(500).json(err);
                    });
            })
            .catch(function(err) {
                console.log('Find Category While Updating Item Error: ', err);
                res.status(500).json(err);
            });
    }

    static delete(req, res) {
        Item.findByIdAndDelete(req.params.id)
            .then(function(result) {
                res.status(200).json(result);
            })
            .catch(function(err) {
                res.status(500).json(err.message);
            });
    }

    static searchByName(req, res) {
        Item.find({name: new RegExp(req.params.keyword, 'i')})
            .then(function(items) {
                res.status(200).json(items);
            })
            .catch(function(err) {
                res.status(500).json(err.message); 
            });
    }
}

module.exports = ItemController;