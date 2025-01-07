const { BAD_REQUEST } = require("../../constants/apiResponse")

const validateTaskCreate = async (req, res, next) => {
    const { title, description } = req.body

    if (!title || !description) {
        return res.status(BAD_REQUEST).json({message:"All fields are required"})
    }

   /* 
    if (title.length <= 0 || this.description.length <= 0) {
        return res.status(BAD_REQUEST).json({message:"Title or description cannot be empty"})
    }
    */
    
    next()
}

module.exports = validateTaskCreate;