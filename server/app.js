var express = require('express');
var app = express();
var cors=require('cors')

const mongoose=require('mongoose')



const productRoutes=require('./router/product.js')
const categoryRoutes=require('./router/category.js')
const cartRoutes=require('./router/cart.js')
const userRoutes=require('./router/user.js')

mongoose.connect('mongodb://localhost:27017/e-commerce',{useNewUrlParser:true});

app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use('/product', productRoutes);
app.use('/category', categoryRoutes);
app.use('/cart',cartRoutes)
app.use('/user',userRoutes)

app.listen(3000,function(){
    console.log('listen at port 3000')
});
