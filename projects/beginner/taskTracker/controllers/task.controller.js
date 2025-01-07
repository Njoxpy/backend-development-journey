// model
const Task = require("../models/taskModel")
// Status
const { CREATED } = require("../constants/apiResponse");

// CREATE TASK
export const createTask = async (req, res) => {
    const { title, description } = req.body

    try {
        const newTask = await Task.create({title, description})

        res.status(CREATED).json(newTask)
    } catch (error) {
        
    }
}