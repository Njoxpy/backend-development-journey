const mongoose = require("mongoose")
const blogSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: [true, "Title is required"],
            // recommended length for the title
        },
        content: {

        }
    }
)

// title, VARCHAR(100), content VARCHAR(1000), author VARCHAR(100), date DATE