var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: {
      type:String,
      required:true
  },
  email: {
    type:String,
    required:true
  },
  password: {
    type:String,
    required:true
  },
  hasShop:{
      type:Boolean,
      default:false
  },
  role:{
    type:String,
    default:'client'
  },
  userCart:[
    {type: Schema.Types.ObjectId, ref: 'Transaction'}
  ],
  userTransaction:[
    {type: Schema.Types.ObjectId, ref: 'Transaction'}
  ]
});

var User = mongoose.model('User', userSchema);

module.exports=User