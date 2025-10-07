

const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  password: String,
  confirmPassword: String,
});

const SignupUser = mongoose.model("SignupUser", signupSchema);

module.exports = SignupUser;