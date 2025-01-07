const mongoose = require("mongoose");

const validateObjectId = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ message: "Task with that id not found" });
  }

  next();
};

module.exports = validateObjectId;
