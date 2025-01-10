require("dotenv").config()
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const db = require("./config/DB")


// Initialize the app
const app = express();
// routes

// Middleware to parse JSON
app.use(bodyParser.json());
app.use(express.json())

const blogRoutes = require("./routes/blog.routes")

app.use("/api/v1/blogs", blogRoutes)

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
