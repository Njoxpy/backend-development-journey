// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// Load environment variables
dotenv.config();

// Initialize the app
const app = express();

// routes
const todoRoutes = require("./routes/task.routes")
const userRoutes = require("./routes/user.routes")
// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse JSON bodies

app.use("/api/v1/todos/", todoRoutes);
app.use("/api/v1/users", userRoutes)

const dbURI = process.env.DB_URI || 'mongodb://localhost:27017/todo'; 
mongoose.connect(dbURI, {
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Failed to connect to MongoDB', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});
