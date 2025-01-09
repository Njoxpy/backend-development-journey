const { v4: uuidv4 } = require("uuid");

const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
            minLength: 1,
            maxLength: 50
        },
        description: {
            type: String,
            minLength: 1,
            maxLength: 500
        },
        taskId: {
            type: String,
            default: () => {
                try { 
                    return `TASK-${uuidv4()}`
                } catch (error) {
                    return `TASK-${Date.now()}`
                }
            },
            required: true,
            unique: true
        }
    },
    {timestamps: true}
)

const Todo = mongoose.model("Todo", todoSchema)
module.exports = Todo