const express = require('express'),
      app = express();

const cors = require('cors'),
      jwt = require('jsonwebtoken'),
      bodyParser= require('body-parser');

const indexRouter = require('./routes/index'),
      usersRouter = require('./routes/users'),
      itemsRouter = require('./routes/items'),
      categoriesRouter = require('./routes/categories'),
      transactionsRouter = require('./routes/transactions');

let PORT = process.env.PORT || 3000;

//Connecting to Mongoose
const mongoose   = require('mongoose'),
      url = `mongodb://illion01:illion01@ds255262.mlab.com:55262/e-commerce`;

mongoose.connect(url,{ useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('We are connected');
});

app.listen (PORT, () => {
  console.log(`Application listening on port: ${PORT}`);
});

app
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(cors());

app
  .use('/api', indexRouter)
  .use('/api/users', usersRouter)
  .use('/api/items', itemsRouter)
  .use('/api/categories', categoriesRouter)
  .use('/api/transactions', transactionsRouter);