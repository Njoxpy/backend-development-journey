const mongoose = require("mongoose");
const Todo = require("../models/todo.model");

// utils
const EMPTY = require("../utils/utils");

const createTodo = async (req, res) => {
  const { title, description, userId } = req.body;

  console.log(title.length);
  console.log(description.length);
  // validate inputs
  if (!title || !description || !userId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "user not does not exits!" });
  }
  if (title.length > 50) {
    return res
      .status(400)
      .json({ message: "Title should not exceed 50 characters" });
  }

  if (title.description > 500) {
    return res
      .status(400)
      .json({ message: "Title should not exceed 50 characters" });
  }

  try {
    const todo = await Todo.create({ title, description });

    res.status(201).json(todo);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create todo", error: error.message });
  }
};

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });

    if (todos.length === EMPTY) {
      return res.status(404).json({ message: "No todos for now" });
    }

    res.status(200).json(todos);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get todos", error: error.message });
  }
};

const getTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Todo not found" });
  }

  try {
    const todo = await Todo.findOne({ _id: id });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found!" });
    }
    res.status(200).json(todo);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get todo", error: error.message });
  }
};

const updateTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Todo not found" });
  }

  console.log(req.body.title);
  // check length of request body
  if (req.body.title.length === EMPTY) {
    return res.status(400).json({ message: "title cannot be empty" });
  }

  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(201).json({ message: `Updated sucessfully`, updatedTodo });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update todo", error: error.message });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Todo not found" });
  }
  try {
    const deletedTodo = await Todo.findOneAndDelete({ _id: id });

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({ message: "Updated sucessfully", deletedTodo });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete todo", error: error.message });
  }
};
module.exports = {
  createTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo,
};
