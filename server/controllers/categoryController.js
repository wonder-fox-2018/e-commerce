const Category = require('../models/category')

class Controller {
    static create(req,res){
        let newCategory = new Category({
            name: req.body.name
        })

        // res.json(newItem)

        newCategory.save()
            .then(function () {
                res.status(200).json({
                    message: `add category success`
                })
            })
            .catch(function () {
                res.status(500).json({
                    message: `add category failed`
                })
            })
    }

    static read(req,res){
        Category.find()
            .then(function (listCategory) {
                res.status(200).json({
                    listCategory
                })
            })
    }


}

module.exports = Controller;