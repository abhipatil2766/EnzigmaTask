const db = require('./db');

const Task = {
  findAll: (userId, callback) => {
    const query = 'SELECT * FROM tasks WHERE userId = ?';
    db.query(query, [userId], callback);
  },

  create: (task, callback) => {
    const query = 'INSERT INTO tasks (name, priority, deadline, category, userId) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [task.name, task.priority, task.deadline, task.category, task.userId], callback);
  },

  update: (id, task, callback) => {
    const query = 'UPDATE tasks SET name = ?, priority = ?, deadline = ?, category = ? WHERE id = ?';
    db.query(query, [task.name, task.priority, task.deadline, task.category, id], callback);
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM tasks WHERE id = ?';
    db.query(query, [id], callback);
  }
};

module.exports = Task;
