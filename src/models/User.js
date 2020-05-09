const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    validate(value) {
      const passwordStrengthRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*+]).*/;
      if (!passwordStrengthRegex.test(value)) {
        throw new Error(
          "Password must contain at least 1 upper case letter, 1 lower case letter, 1 number, and 1 special character"
        );
      }
    },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
