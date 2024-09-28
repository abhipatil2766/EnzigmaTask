const express = require('express');
const jwt = require('jsonwebtoken');
const Task = require('../models/task');

const router = express.Router();

// Middleware to authenticate users
const auth = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.user = decoded.userId;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

// Get all tasks
router.get('/', auth, (req, res) => {
  Task.findAll(req.user, (err, tasks) => {
    if (err) return res.status(500).json({ error: err });
    res.json(tasks);
  });
});

// Create a new task
router.post('/', auth, (req, res) => {
  const task = {
    name: req.body.name,
    priority: req.body.priority,
    deadline: req.body.deadline,
    category: req.body.category,
    userId: req.user,
  };

  Task.create(task, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Task created successfully' });
  });
});

// Update a task
router.put('/:id', auth, (req, res) => {
  const task = {
    name: req.body.name,
    priority: req.body.priority,
    deadline: req.body.deadline,
    category: req.body.category,
  };

  Task.update(req.params.id, task, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Task updated successfully' });
  });
});

// Delete a task
router.delete('/:id', auth, (req, res) => {
  Task.delete(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Task deleted successfully' });
  });
});

module.exports = router;
