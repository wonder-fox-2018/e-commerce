//EXPRESS AND DOTENV
const express  = require('express')
const app = express()
require('dotenv').config()

//CLIENT AND SERVER
const cors = require('cors')
app.use(cors())
app.use(express.urlencoded({extended : false}))
app.use(express.json())

//ROUTES
const routes   = require('./routes')
const userRoutes = require('./routes/users')
const categoryRoutes = require('./routes/categories')
const itemRoutes = require('./routes/items')
app.use('/', routes)
app.use('/users',userRoutes)
app.use('/categories',categoryRoutes)
app.use('/items',itemRoutes)

//DATABASE
const mongoose = require('mongoose')
mongoose.connect(process.env.MY_LOCAL_MONGODB, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo failed to connect:'));
db.once('open', function() {
  console.log('mongo connected')
});

//PORT
const port = 3000
app.listen(port, function(){
    console.log('Listening on port', port)
})




