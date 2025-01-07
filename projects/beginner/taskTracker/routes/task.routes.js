const express = require('express');

// controllers
const { createTask, getTasks, getTask, updateTask, deleteTask, markStatus } = require('../controllers/task.controller');
const router = express.Router()

// middleware
const validateObjectId = require("../middleware/validation/validateObjectId")
const validateTaskCreate = require("../middleware/validation/validateCreateTask")

// create
router.post("/",validateTaskCreate, createTask)

// read
router.get("/", getTasks)

// get task
router.get("/:id",validateObjectId, getTask)

// update 
router.patch("/:id", validateObjectId, updateTask)

// delete
router.delete("/:id",validateObjectId, deleteTask);

// mark done, in progress
router.put("/:id/status/:id", validateObjectId, markStatus)

module.exports = router;