const mongoose = require("mongoose");
const isEmail = require("validator/lib/isEmail");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: isEmail,
      message: "{VALUE} is not valid email"
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    trim: true
  }
});

module.exports = mongoose.model("User", UserSchema);
