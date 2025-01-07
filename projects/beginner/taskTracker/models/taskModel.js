const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema(
  {
    title: {
      required: [true, "title is required"],
      type: String,
    },
    description: {
      required: [true, "description is required"],
      type: String,
    },
    status:{
      type: String,
      enum: ["in progress", "done"],
      default: "in progress",
      required: [true, "status is required"]
    }
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
