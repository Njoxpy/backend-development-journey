const User = require("../models/user.model");

const signup = async (req, res) => {
  const { name, password, email } = req.body;

  // validate request body
  if (!name || !password || !email) {
    return res
      .status(400)
      .json({ message: "Name, password and email are required" });
  }

  // validate password if it matches criteria and email if it matches criteria
  try {
    const newUser = await User.signup(email, password, name);
    res.status(200).json(newUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create user", error: error.message });
  }
};

const login = async (req, res) => {
  const { password, email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "There is no account associated with that email" });
    }

    // Compare password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Failed to login", error: error.message });
  }
};

module.exports = {
  signup,
  login,
};
