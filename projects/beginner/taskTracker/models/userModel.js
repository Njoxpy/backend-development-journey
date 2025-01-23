// create user model
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const SALT_ROUNDS = 12;

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      // include match fo the email
    },
    password: {
      type: String,
      required: true,
      // how to make inline validators into password
    },
  },
  { timestamps: true }
);

// signup
userSchema.statics.signup = async function (email, password) {
  // validate email and password
  if (!email) {
    throw new Error("Email is required");
  }

  if (!password) {
    throw new Error("Password is required");
  }

  //   find user with that email who exists
  const exists = await this.findOne({ email });

  if (exists) {
    throw new Error("User with this email exists! try different one");
  }

  //   salt rounds
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS || 10);
  const newUser = await this.create({ email, password: hashedPassword });

  return newUser;
};

// login
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("User with that email does not exist");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Incorrect password");
  }

  return user;
};

const User = mongoose.model("user", userSchema);
module.exports = User;

// install validator
