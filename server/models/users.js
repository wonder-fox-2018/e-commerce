let hashPass = require("../helpers/hashPass");

const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const userScheme = new Schema(
  {
    name: {
      type: String,
      required: [true, 'name is required']
    },
    email: {
      type: String,
      unique: [true, `email is already exists`],
      required: [true, 'email is required'],
      match : [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Invalid email format!']
    },
    password:{
      type: String,
      minlength: [5, 'password min 5 character'],
      required: [true, 'password is required'],
    },
    role: {
      type: String,
      default: 'User'
    }
  },
  {
    timestamps: true
  }
);

userScheme.pre("save", function(next) {
  this.password = hashPass(this.password);
  next();
});

// userScheme.pre("updateOne", function(next) {
//   this.password = hashPass(this.password);
//   next();
// });

const User = mongoose.model("User", userScheme);
module.exports = User;
