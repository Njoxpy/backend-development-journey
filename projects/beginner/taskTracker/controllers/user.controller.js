// import user model
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// create token
const createToken = (_id) => {
  const results = jwt.sign({ _id }, process.env.SECRET, { expiresIn: "30d" });
  return results;
};

const createUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newUser = await User.signup(email, password);

    const token = createToken(newUser._id);

    res.status(201).json({ email, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createUser,
  login,
};
