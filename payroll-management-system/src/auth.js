const bcrypt = require('bcrypt');
const db = require('./db');

function findUserByEmail(email) {
  return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
}

function findUserById(id) {
  return db.prepare('SELECT * FROM users WHERE id = ?').get(id);
}

function authenticate(email, password) {
  const user = findUserByEmail(email);
  if (!user) return null;
  const ok = bcrypt.compareSync(password, user.password_hash);
  return ok ? user : null;
}

function requireAuth(req, res, next) {
  if (!req.session.userId) return res.redirect('/login');
  next();
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.session.userId) return res.redirect('/login');
    const user = findUserById(req.session.userId);
    if (!user || !roles.includes(user.role)) return res.status(403).send('Forbidden');
    next();
  };
}

module.exports = { authenticate, requireAuth, requireRole, findUserById };


