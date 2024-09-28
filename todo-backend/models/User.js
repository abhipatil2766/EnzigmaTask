const db = require('./db');
const bcrypt = require('bcryptjs');

const User = {
  findByEmail: (email, callback) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], callback);
  },

  create: (user, callback) => {
    const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
    db.query(query, [user.email, user.password], callback);
  },
};

module.exports = User;
