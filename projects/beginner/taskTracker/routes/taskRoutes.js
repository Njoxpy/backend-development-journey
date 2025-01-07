const express = require('express');

// controllers
const { createTask } = require('../controllers/task.controller');
const router = express.Router()

// create
router.post("/", createTask)
// read
// update 
// delete
module.exports = router;