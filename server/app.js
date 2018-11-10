require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const cors = require('cors');
const indexRouter = require('./routes/indexRouter.js');
const userRouter = require('./routes/userRouter.js');
const itemRouter = require('./routes/itemRouter.js');
const cartRouter = require('./routes/cartRouter.js');
const transactionRouter = require('./routes/transactionRouter.js');
const categoryRouter = require('./routes/categoryRouter.js');

mongoose.connect('mongodb://localhost/e-commerce', {useNewUrlParser: true});

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/items', itemRouter);
app.use('/cart', cartRouter);
app.use('/transaction', transactionRouter);
app.use('/categories', categoryRouter);

app.listen(port, function() {
    console.log('Listening on port', port);
});