'use strict'

const Transaction = require('../models/transaction')
const User = require('../models/user')
const nodemailer = require('nodemailer')
const transactionStatement = require('../helpers/transactionStatement')
// const CronJob = require('cron').CronJob

class TransactionController {
    //create transaction
    static createTransaction(req,res){
        // console.log('Controller ----', req.body)
        // console.log('DECODED ---------', req.decoded)
        Transaction.create({
            transactionuserid: req.decoded.userid,
            transactionitemid: req.body.transactionitemid,
            transactionamount: Number(req.body.transactionamount) 
        })
          .then(transaction => {
            let newtransaction = transaction
            // console.log('new transaction-------', newtransaction)
          
            // get detail transaction
            Transaction.findOne({ _id: newtransaction._id }).populate('transactionitemid')
                .then(transactionreport =>{
                    // console.log('TRansaction report-----', transactionreport)
                    // update user
                    let detailTransaction = transactionStatement(transactionreport.transactionitemid)

                    // get detail of user data
                    User.findOneAndUpdate({
                        _id: transaction.transactionuserid
                    },{
                        $push: {
                            transactionslist: transaction._id
                        }
                    })
                    .then(user => {
                        let buyer = user

                        // NOTE: Only triggered when user hit transaction button
                        // and will continue doing background job after hit
                        // thus will cost your server a life
                        // --->better to keep it foreground
                        // set a background process
                        // console.log('Before job instantiation');
                        // const job = new CronJob('* * * * * *', function() {
                        // 	const d = new Date();
                        // 	console.log('Every second:', d);
                        // });
                        // console.log('After job instantiation');
                        // job.start();

                        // send email after transaction
                        let transporter = nodemailer.createTransport(
                            {
                                service: 'gmail',
                                auth: {
                                    user: process.env.EMAIL,
                                    pass: process.env.PASSWORD
                                }
                            }
                        )

                        let mailOptions = {
                            from: '"ECosmetics" <ecosmetics23.wonder.gmail.com>', // sender address
                            to: `${buyer.email}`, // list of receivers
                            subject: `Hi ${buyer.name} this is the report of your transaction`, // Subject line
                            text: 'OK', // plain text body
                            html:
                                `
                                <h2>
                                    Hi ${buyer.name} thanks for your purchase
                                </h2>
                                <p>
                                    The total amount of your transaction is <b>IDR ${newtransaction.transactionamount}</b>
                                    with total of ${newtransaction.transactionitemid.length} item(s)
                                </p>
                                <p>This is the detail of your transaction: </p>
                                <table border="1px solid black">
                                   <thead>
                                       <th>No. </th>
                                       <th>Description</th>
                                       <th>Price</th>
                                   </thead>
                                   <tbody>
                                     ${detailTransaction} 
                                   </tbody> 
                                </table>
                                <hr>
                                <p>
                                Should you have any query don't hesitate to contact us at ecosmetics23.wonder.gmail.com
                                </p>
                                <p>
                                Best Regards,  
                                </p>
                                <p> ECosmetics Sales Team </p>
                                ` 
                                // html body
                        };

                        transporter.sendMail(mailOptions, (error, info)=>{
                            if (error) {
                                    console.log('Error occurred');
                                    console.log(error.message);
                                    // return process.exit(1);
                            }else{
                                console.log('Message sent successfully!');
                                console.log(nodemailer.getTestMessageUrl(info));
                        
                                // only needed when using pooled connections
                                // transporter.close();
                            }                        
                        })

                        res.status(200).json({
                            msg: 'Transaction success',
                            data: newtransaction,
                            owner: user
                        })
                    })
                    .catch(error => {
                        res.status(500).json({
                            msg: 'ERROR update transaction to user ',error
                        })
                    })
                })
                .catch(error =>{

                })
          })
          .catch(error => {
              res.status(500).json({
                  msg: 'ERROR Create transaction ',error
              })
          })
    }

    // show transaction
    static showListTransaction(req,res){
        Transaction.find({}).populate('transactionitemid')
         .then(transactions =>{
            res.status(200).json({
                msg: 'List of transactions',
                data: transactions
            })
         })
         .catch(error => {
            res.status(500).json({
                msg: 'ERROR Get list of transactions ',error
            }) 
         })
    }
}

module.exports = TransactionController