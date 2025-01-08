To use **MySQL** in your MERN project, you can follow these steps:

---

### **1. Set Up MySQL**
1. **Install MySQL:**
   If you don’t have MySQL installed, download and install it from [here](https://dev.mysql.com/downloads/).
   
2. **Create a Database:**
   Create a new database for your project. You can use the MySQL CLI or a GUI tool like **phpMyAdmin** or **MySQL Workbench**.

   ```sql
   CREATE DATABASE taskdb;
   ```

3. **Create a Table:**
   Define a `tasks` table in your `taskdb` database:

   ```sql
   USE taskdb;

   CREATE TABLE tasks (
       id INT AUTO_INCREMENT PRIMARY KEY,
       title VARCHAR(255) NOT NULL,
       description TEXT NOT NULL,
       status ENUM('pending', 'in-progress', 'completed') DEFAULT 'pending',
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   );
   ```

---

### **2. Set Up MySQL in the Backend (Express)**

You’ll use the **`mysql2`** package for Node.js to interact with the MySQL database.

1. **Install `mysql2`:**

   ```bash
   npm install mysql2
   ```

2. **Set Up the MySQL Connection:**

   Create a `db.js` file to set up the connection to MySQL:

   ```js
   const mysql = require('mysql2');

   // Create a connection pool
   const pool = mysql.createPool({
       host: 'localhost',
       user: 'your-username',      // Replace with your MySQL username
       password: 'your-password',  // Replace with your MySQL password
       database: 'taskdb'
   });

   // Export the pool for use in other files
   module.exports = pool.promise();
   ```

3. **Define CRUD Operations for Tasks:**

   Create a `taskController.js` file to define task-related operations:

   ```js
   const db = require('../config/db'); // Import the MySQL connection

   // Get all tasks
   const getAllTasks = async (req, res) => {
       try {
           const [tasks] = await db.query('SELECT * FROM tasks');
           res.status(200).json(tasks);
       } catch (err) {
           console.error(err);
           res.status(500).json({ message: 'Error fetching tasks' });
       }
   };

   // Create a new task
   const createTask = async (req, res) => {
       const { title, description } = req.body;

       if (!title || !description) {
           return res.status(400).json({ message: 'All fields are required' });
       }

       try {
           const [result] = await db.query(
               'INSERT INTO tasks (title, description) VALUES (?, ?)',
               [title, description]
           );
           res.status(201).json({ id: result.insertId, title, description, status: 'pending' });
       } catch (err) {
           console.error(err);
           res.status(500).json({ message: 'Error creating task' });
       }
   };

   // Update task status
   const updateTaskStatus = async (req, res) => {
       const { id } = req.params;
       const { status } = req.body;

       if (!['pending', 'in-progress', 'completed'].includes(status)) {
           return res.status(400).json({ message: 'Invalid status value' });
       }

       try {
           const [result] = await db.query(
               'UPDATE tasks SET status = ? WHERE id = ?',
               [status, id]
           );

           if (result.affectedRows === 0) {
               return res.status(404).json({ message: 'Task not found' });
           }

           res.status(200).json({ message: 'Task updated successfully' });
       } catch (err) {
           console.error(err);
           res.status(500).json({ message: 'Error updating task' });
       }
   };

   // Delete a task
   const deleteTask = async (req, res) => {
       const { id } = req.params;

       try {
           const [result] = await db.query('DELETE FROM tasks WHERE id = ?', [id]);

           if (result.affectedRows === 0) {
               return res.status(404).json({ message: 'Task not found' });
           }

           res.status(200).json({ message: 'Task deleted successfully' });
       } catch (err) {
           console.error(err);
           res.status(500).json({ message: 'Error deleting task' });
       }
   };

   module.exports = { getAllTasks, createTask, updateTaskStatus, deleteTask };
   ```

4. **Set Up Routes:**

   Create a `taskRoutes.js` file to define the API endpoints:

   ```js
   const express = require('express');
   const { getAllTasks, createTask, updateTaskStatus, deleteTask } = require('../controllers/taskController');

   const router = express.Router();

   router.get('/tasks', getAllTasks);
   router.post('/tasks', createTask);
   router.put('/tasks/:id', updateTaskStatus);
   router.delete('/tasks/:id', deleteTask);

   module.exports = router;
   ```

5. **Integrate Routes into Express App:**

   Update your main `app.js` file to include the task routes:

   ```js
   const express = require('express');
   const bodyParser = require('body-parser');
   const taskRoutes = require('./routes/taskRoutes'); // Import task routes

   const app = express();

   // Middleware
   app.use(bodyParser.json()); // Parse incoming JSON requests

   // Routes
   app.use('/api', taskRoutes);

   // Start the server
   const PORT = 5000;
   app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
   ```

---

### **3. React Frontend**

The React frontend remains the same, as it communicates with the backend through API calls.

Example for fetching tasks in React:

```js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskApp = () => {
   const [tasks, setTasks] = useState([]);

   useEffect(() => {
      axios.get('http://localhost:5000/api/tasks')
         .then(response => setTasks(response.data))
         .catch(error => console.error('Error fetching tasks:', error));
   }, []);

   return (
      <div>
         <h1>Task List</h1>
         <ul>
            {tasks.map(task => (
               <li key={task.id}>
                  <strong>{task.title}</strong>: {task.description} - {task.status}
               </li>
            ))}
         </ul>
      </div>
   );
};

export default TaskApp;
```

---

### **4. Testing the API**
You can use tools like **Postman** or **cURL** to test your API endpoints:
- **GET** `/api/tasks`
- **POST** `/api/tasks` (with `title` and `description` in the body)
- **PUT** `/api/tasks/:id` (to update the status)
- **DELETE** `/api/tasks/:id`

---

### Conclusion
By replacing MongoDB with **MySQL**, your **MERN** stack project can now use SQL databases while maintaining the rest of the stack (Express, React, Node.js). Let me know if you need further clarification!