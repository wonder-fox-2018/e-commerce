var express = require('express');
var app = express();
var cors=require('cors')

const mongoose=require('mongoose')

const productRoutes=require('./router/product.js')
const categoryRoutes=require('./router/category.js')
const cartRoutes=require('./router/cart.js')
const userRoutes=require('./router/user.js')
const routes=require('./router/index.js')

mongoose.connect(process.env.DBURL,{useNewUrlParser:true});

app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())


app.use('/product', productRoutes);
app.use('/category', categoryRoutes);
app.use('/cart',cartRoutes)
app.use('/user',userRoutes)

app.use('/', routes);


app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
      message: err.message,
      error: err
    })
  })
}

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    message: err.message,
    error: {}
  })
})


module.exports = app

