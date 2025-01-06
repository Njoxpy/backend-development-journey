# Task Tracker

**Task Tracker** is a project used to track and manage your tasks. In this task, you will build a simple application to track what you need to do, what you have done, and what you are currently working on. This project will help you practice your programming skills, including working with the filesystem, handling user inputs, and building a user-friendly application.

## Requirements

The application should:
- Accept user actions and inputs to manage tasks.
- Store the tasks in a JSON file.

### Features
The user should be able to:
1. **Add, Update, and Delete tasks**
2. **Mark a task as in progress or done**
3. **List all tasks**
4. **List tasks by status:**
   - Tasks that are done
   - Tasks that are not done (todo)
   - Tasks that are in progress

### Constraints
- Use any programming language to build this project.
- Use a JSON file to store tasks in the current directory.
- The JSON file should be created if it does not exist.
- Use the native file system module of your programming language.
- Do not use external libraries or frameworks.
- Handle errors and edge cases gracefully.

---

## Task Properties

Each task should have the following properties:

- `id`: A unique identifier for the task
- `description`: A short description of the task
- `status`: The status of the task (`todo`, `in-progress`, `done`)
- `createdAt`: The date and time when the task was created
- `updatedAt`: The date and time when the task was last updated

These properties should be stored in the JSON file when adding a task and updated when modifying a task.

---

## Getting Started

### Set Up Your Development Environment
1. Choose a programming language (e.g., Python, JavaScript, etc.).
2. Ensure you have a code editor or IDE installed (e.g., VSCode, PyCharm).

### Project Initialization
1. Create a new project directory for your Task Tracker application.
2. Initialize a version control system (e.g., Git).

---

## Implementation Steps

1. **Set up the basic application structure** to handle user inputs and task management.
2. Implement each feature one by one:
   - Add task functionality
   - Listing tasks
   - Updating tasks
   - Marking tasks by status (`in-progress` or `done`)
   - Deleting tasks
3. **Test each feature individually** to ensure it works as expected. Verify tasks are stored correctly in the JSON file.
4. Handle errors and edge cases:
   - Missing or invalid inputs
   - Non-existent task IDs
5. Finalize the project:
   - Clean up the code and add comments.
   - Write a `README.md` file to document how to use the application.

---

## Testing and Debugging

- Test each feature and ensure it behaves as expected.
- Look at the JSON file to confirm tasks are being stored correctly.

---

## Final Steps

- Ensure all features are implemented and tested thoroughly.
- Add helpful error messages and edge case handling.
- Write clear documentation for users.

By the end of this project, you will have a fully functional Task Tracker application that helps manage tasks efficiently. This is a great foundational project for advancing your programming skills and building real-world applications.

Happy coding!
