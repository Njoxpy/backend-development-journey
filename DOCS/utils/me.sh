#!/bin/bash

# Ask the user for the project name
read -p "Enter your project name: " project_name

# Create project directory
mkdir $project_name
cd $project_name

# Initialize Node.js project
echo "Initializing Node.js project..."
npm init -y

# Install required dependencies
echo "Installing dependencies..."
npm install bcryptjs@2.4.3 body-parser@2.0.2 cors@2.8.5 dotenv@16.4.7 express@5.0.1 jsonwebtoken@9.0.2 mongoose@8.9.3 nodemon@3.1.9

# Install development dependencies
echo "Installing development dependencies..."
npm install --save-dev @eslint/js@9.17.0 eslint@9.17.0 globals@15.14.0

# Create the basic folder structure
mkdir -p src/controllers src/routes src/models src/middleware src/utils

# Create server.js with user-defined project name
cat > src/server.js <<EOL
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

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse JSON bodies

// MongoDB connection setup
const dbURI = process.env.DB_URI || 'mongodb://localhost:27017/$project_name'; 
mongoose.connect(dbURI, {
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Failed to connect to MongoDB', err));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server running on localhost:\${PORT}\`);
});
EOL

# Replace placeholder with user-defined project name
sed -i "s/\$project_name/$project_name/g" src/server.js

# Create basic route example
cat > src/routes/index.js <<EOL
const express = require('express');
const router = express.Router();

// Default route
router.get('/', (req, res) => {
  res.send('Welcome to the $project_name API');
});

module.exports = router;
EOL

# Create a basic controller example
cat > src/controllers/indexController.js <<EOL
// Controller example for basic routing
exports.index = (req, res) => {
  res.send('Welcome to the $project_name API');
};
EOL

# Create a basic model example
cat > src/models/indexModel.js <<EOL
// Example model file for database interactions
module.exports = {
  // Add model schema here
};
EOL

# Create middleware example
cat > src/middleware/logger.js <<EOL
const logger = (req, res, next) => {
  console.log(\`[INFO] \${req.method} \${req.url} - \${new Date().toISOString()}\`);
  next();
};

module.exports = logger;
EOL

# Create utility functions example
cat > src/utils/helpers.js <<EOL
// Example helper functions
module.exports = {
  // Add utility functions here
};
EOL

# Create a .env file for environment variables
cat > .env <<EOL
DB_URI=mongodb://localhost:27017/$project_name
PORT=3000
EOL

# Add scripts to package.json
echo "Updating package.json scripts..."
jq '.scripts = { "server": "nodemon src/server.js" }' package.json > temp.json && mv temp.json package.json

# Done
echo "$project_name project with server.js and all dependencies has been created successfully!"
