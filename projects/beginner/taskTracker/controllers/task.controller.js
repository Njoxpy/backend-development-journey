// model
const Task = require("../models/taskModel")

const { OK, CREATED, NOT_FOUND, INTERNAL_SERVER_ERROR, BAD_REQUEST } = require("../constants/apiResponse")

// CREATE TASK
const createTask = async (req, res) => {
    const { title, description } = req.body

    try {
        const newTask = await Task.create({title, description})

        res.status(CREATED).json(newTask)
    } catch (error) {
       res.status(INTERNAL_SERVER_ERROR).json({message:"failed to add task", details: error.message}) 
    }
}

// READ
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find().sort({createdAt: -1})

        if (tasks.length === 0) {
            return res.status(NOT_FOUND).json({message:"There are no tasks for now"})
        }
        res.status(OK).json(tasks);
    } catch (error) {
        res.status(INTERNAL_SERVER_ERROR).json({message:"failed get tasks", details: error.message}) 
    }
}

// get task
const getTask = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findOne({_id: id})
        if (!task) {
            return res.status(NOT_FOUND).json({message:"Task not found"})
        }
        res.status(OK).json(task)
    } catch (error) {
        res.status(INTERNAL_SERVER_ERROR).json({message:"failed get task", details: error.message}) 
    }
}

// update
const updateTask = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedTask = await Task.findOneAndUpdate({_id: id}, {...req.body}, {new: true})

        if (!updateTask) {
            return res.status(NOT_FOUND).json({error:"Not found"})
        }

        res.status(OK).json("Updated sucessfully", updatedTask)
    } catch (error) {
        res.status(INTERNAL_SERVER_ERROR).json({message:"failed update task", details: error.message}) 
    }
}
// update status
const markStatus = async (req, res) => {

    const { status } = req.body;

    if (status !== "done" || status !== "in progress") {
        return res.status(BAD_REQUEST).json({message:"Update status is not correct"})
    }

    try {
        const updatedTaskStatus = await Task.findOneAndUpdate({status}, {...req.body});

        if (!updatedTaskStatus) {
            return res.status(BAD_REQUEST).json({message:"Task not found"})
        }

        res.status(OK).json({message:"Updated sucessfully", updatedTaskStatus})
    } catch (error) {
        res.status(INTERNAL_SERVER_ERROR).json({message:"failed update task status", details: error.message}) 
    }

}

// delete
const deleteTask = async (req, res) => {
    const { id } = req.params

    try {
        const deletedTask = await Task.findOneAndDelete({_id: id})

        if (!deletedTask) {
            return res.status(NOT_FOUND).json({message:"Task Not found"})
        }
        res.status(OK).json("Deleted sucessfully", deletedTask)
    } catch (error) {
        res.status(INTERNAL_SERVER_ERROR).json({message:"failed to delete task", details: error.message}) 
    }
}

module.exports = {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask,
    markStatus
}

// get task which are done and those