const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const generatePassword = require("../helpers/generatePassword");

var userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is requires"]
    },
    picture: {
      type: String
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email is requires"]
    },
    password: {
      type: String,
      required: [true, "password is requires"],
      minlength: [6, "password min 6 character"]
    },
    marketAvailable: {
      type: Boolean,
      default: false
    },
    transactions: [{ type: Schema.Types.ObjectId, ref: "Transaction" }]
  },
  {
    timestamps: true
  }
);

userSchema.post("save", function(user) {
  generatePassword(this.email, this.password).then(function(newPassword) {
    User.update({ _id: user._id }, { password: newPassword })
      .then(function() {})
      .catch(function() {});
  });
});

const User = mongoose.model("User", userSchema);

module.exports = User;
