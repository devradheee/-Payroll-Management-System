const bcrypt = require('bcrypt');
const db = require('./db');

function ensureAdmin() {
  const adminEmail = 'admin@payroll.local';
  const find = db.prepare('SELECT id FROM users WHERE email = ?');
  const existing = find.get(adminEmail);
  if (existing) return;

  const passwordHash = bcrypt.hashSync('admin123', 10);
  const insert = db.prepare('INSERT INTO users (name, email, password_hash, role) VALUES (?,?,?,?)');
  insert.run('Admin', adminEmail, passwordHash, 'admin');
}

function seedDemo() {
  ensureAdmin();
}

if (require.main === module) {
  seedDemo();
  console.log('Seed completed. Default admin: admin@payroll.local / admin123');
}

module.exports = { seedDemo };


