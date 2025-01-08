require("dotenv").config()
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const db = require("./config/DB")


// Initialize the app
const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
