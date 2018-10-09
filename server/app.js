'use strict'

require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const CronJob = require('cron').CronJob
const IndexRoutes = require('./routes/IndexRoutes')
const UserRoutes = require('./routes/UserRoutes')
const ItemRoutes = require('./routes/ItemRoutes')
const TransactionRoutes = require('./routes/TransactionRoutes')
const app = express()

mongoose.connect('mongodb://localhost:27017/ecosmeticsdb', {useNewUrlParser: true});


app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use('/user', IndexRoutes)
app.use('/users', UserRoutes)
app.use('/items', ItemRoutes)
app.use('/transactions', TransactionRoutes)


// console.log('Before job instantiation');
// const job = new CronJob('* * * * * *', function() {
//     const d = new Date();
// 	console.log('Every second:', d);
// },null,true, 'Asia/Jakarta');
// console.log('After job instantiation');
// job.start();

app.get('/', (req,res) => { res.send('OK')})
app.listen(process.env.PORT || 3000, () =>{ 
    console.log(`You are listening to PORT ${process.env.PORT}`)
})