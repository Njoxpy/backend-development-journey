const jwt = require("jsonwebtoken");
const User = require("../../models/userModel");

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(201).json({ error: "Authorization token requirred" });
  }

  const token = authorization.split("")[1];
  console.log(token);

  try {
    const { id } = jwt.verify(token, process.env.SECRET);

    req.user = await User.findOne({ _id: id }).select("_id");
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: error.message });
  }
  next();
};

module.exports = authenticate;
