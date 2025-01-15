const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 74,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
    },
  },
  { timestamps: true }
);

userSchema.statics.signup = async function (email, password, name) {
  // find account
  const exists = await this.findOne({ email });

  if (exists) {
    throw new Error("Email already in use!");
  }

  const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash, name });

  return user;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
