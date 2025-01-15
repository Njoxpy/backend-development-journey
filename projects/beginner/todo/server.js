const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");

// Load environment variables

// Initialize the app
const app = express();

// routes
const todoRoutes = require("./routes/task.routes");
const userRoutes = require("./routes/user.routes");

app.use(cors());
app.use(bodyParser.json());

app.use("/api/v1/todos/", todoRoutes);
app.use("/api/v1/users", userRoutes);

const dbURI = process.env.MONGO_URI;
mongoose
  .connect(dbURI, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});
