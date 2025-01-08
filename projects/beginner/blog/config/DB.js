const mysql = require('mysql2');

// Create a connection pool
const connection = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD, // Make sure the environment variable is correctly named
    database: process.env.DATABASE, // Same for the database variable
});

// Using the pool to query
connection.execute('SELECT 1', (err, results) => {
    if (err) {
        console.error("Error connecting to database", err);
        return;
    }
    console.log("Connected to database", results);
});

// Export the connection pool for use elsewhere in your app
module.exports = connection;
