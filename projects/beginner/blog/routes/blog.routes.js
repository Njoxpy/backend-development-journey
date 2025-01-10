const express = require("express")
const db = require("../config/DB")
const { getBlogs, getBlog, createBlog } = require("../controllers/blog.controller")
const router = express.Router()

// CREATE
router.post("/", createBlog)

// READ
router.get("/", getBlogs)

router.get("/:id", getBlog)
// UPDATE

// DELETE

// title, content, date of publication
module.exports = router