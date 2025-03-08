const express = require("express");

// controllers
const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  markStatus,
} = require("../controllers/task.controller");
const router = express.Router();

// middleware
const validateObjectId = require("../middleware/validation/validateObjectId");
const validateTaskCreate = require("../middleware/validation/validateCreateTask");

// auth
const authenticate = require("../middleware/auth/authenticate");

// create
router.post("/", authenticate, validateTaskCreate, createTask);

// read
router.get("/", authenticate, getTasks);

// get task
router.get("/:id", authenticate, validateObjectId, getTask);

// update
router.patch("/:id", authenticate, validateObjectId, updateTask);

// delete
router.delete("/:id", authenticate, validateObjectId, deleteTask);

// mark done, in progress
router.put("/:id/status/:id", authenticate, validateObjectId, markStatus);

module.exports = router;
