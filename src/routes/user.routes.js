const express = require('express');
const router = express.Router();

let users = [
  { id: 1, name: 'Njox', email: 'njox@gmail.com' },
  { id: 2, name: 'Siu', email: 'siucr7@gmail.com' }
];

router.post('/users', (req, res) => {
  const { name, email } = req.body;
  const newUser = {
    id: users.length + 1,
    name,
    email
  };
  users.push(newUser);
  res.status(201).json({
    status: 'success',
    message: 'User created successfully',
    data: newUser
  });
});

router.get('/users', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'List of users',
    data: users
  });
});

router.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'User not found'
    });
  }
  res.status(200).json({
    status: 'success',
    message: 'User found',
    data: user
  });
});

router.put('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'User not found'
    });
  }

  const { name, email } = req.body;
  user.name = name || user.name;
  user.email = email || user.email;

  res.status(200).json({
    status: 'success',
    message: 'User updated successfully',
    data: user
  });
});

router.delete('/users/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex === -1) {
    return res.status(404).json({
      status: 'error',
      message: 'User not found'
    });
  }

  users.splice(userIndex, 1);
  res.status(200).json({
    status: 'success',
    message: 'User deleted successfully'
  });
});

module.exports = router;
