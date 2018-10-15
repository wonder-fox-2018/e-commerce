var Category = require('../model/category');

var Seeder = [{
    name:'Olahraga',
    description:'All About Olahraga'
},{
    name:'Baju Anak',
    description:'All About Baju Anak'
},{
    name:'Baju Kokoh',
    description:'All About Baju Kokoh'
},{
    name:'Makanan',
    description:'All About Makanan'
},{
    name:'Makanan Olahan',
    description:'All About Makanan Olahan'
},{
    name:'Elektronik',
    description:'All About Elektronik'
},{
    name:'HP/Gadget',
    description:'All About HP/Gadget'
},{
    name:'Entertainment',
    description:'All About Entertainment'
}]

Category.insertMany(Seeder)
    .then(function(mongooseDocuments) {
         console.log(mongooseDocuments)
    })
    .catch(function(err) {
        console.log(err)
    });
