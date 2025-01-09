const express = require('express');

// controller
const { createTodo, getTodos, getTodo, updateTodo, deleteTodo } = require('../controllers/todo.controller');
const router = express.Router()

// create
router.post("/", createTodo )

// read
router.get("/", getTodos)

// get todo by
router.get("/:id", getTodo )

// update
router.patch("/:id", updateTodo)

// delete
router.delete("/:id", deleteTodo)

module.exports = router;