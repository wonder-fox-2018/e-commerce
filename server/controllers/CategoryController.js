var CategoryModel = require('../models/CategoryModel.js');

/**
 * CategoryController.js
 *
 * @description :: Server-side logic for managing Categorys.
 */
module.exports = {

    /**
     * CategoryController.list()
     */
    list: function (req, res) {
        CategoryModel.find(function (err, Categorys) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Category.',
                    error: err
                });
            }
            return res.json(Categorys);
        });
    },

    /**
     * CategoryController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        CategoryModel.findOne({_id: id}, function (err, Category) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Category.',
                    error: err
                });
            }
            if (!Category) {
                return res.status(404).json({
                    message: 'No such Category'
                });
            }
            return res.json(Category);
        });
    },

    /**
     * CategoryController.create()
     */
    create: function (req, res) {
        
        var Category = new CategoryModel({
			categoryName : req.body.categoryName,
			description : req.body.description,
			Products : req.body.Products ? req.body.Products : undefined

        });

        CategoryModel.create(Category)
        .then((result) => {
            res.status(201).json(result);
        }).catch((err) => {
            console.log(err)
            res.status(500).json({
                message: 'Error when creating Category',
                error: err
            })
        });


       
    },

    /**
     * CategoryController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        CategoryModel.findOne({_id: id}, function (err, Category) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Category',
                    error: err
                });
            }
            if (!Category) {
                return res.status(404).json({
                    message: 'No such Category'
                });
            }

            Category.categoryName = req.body.categoryName ? req.body.categoryName : Category.categoryName;
			Category.description = req.body.description ? req.body.description : Category.description;
			Category.Products = req.body.Products ? req.body.Products : Category.Products;
			
            Category.save(function (err, Category) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Category.',
                        error: err
                    });
                }

                return res.json(Category);
            });
        });
    },

    /**
     * CategoryController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        CategoryModel.findByIdAndRemove(id, function (err, Category) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Category.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
