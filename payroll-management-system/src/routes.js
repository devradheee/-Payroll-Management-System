const express = require('express');
const db = require('./db');
const { requireAuth, requireRole } = require('./auth');

const router = express.Router();

router.get('/', requireAuth, (req, res) => {
  res.render('index', { user: req.user });
});

// Employees CRUD
router.get('/employees', requireRole('admin', 'hr'), (req, res) => {
  const employees = db.prepare(`
    SELECT e.*, u.name as user_name, u.email as user_email
    FROM employees e LEFT JOIN users u ON u.id = e.user_id
    ORDER BY e.id DESC
  `).all();
  res.render('employees', { employees });
});

router.post('/employees', requireRole('admin', 'hr'), (req, res) => {
  const { employee_code, department, designation, join_date, base_salary } = req.body;
  db.prepare(`INSERT INTO employees (employee_code, department, designation, join_date, base_salary)
              VALUES (?, ?, ?, ?, ?)`)
    .run(employee_code, department || null, designation || null, join_date || null, Number(base_salary || 0));
  res.redirect('/employees');
});

router.post('/employees/:id/delete', requireRole('admin', 'hr'), (req, res) => {
  db.prepare('DELETE FROM employees WHERE id = ?').run(req.params.id);
  res.redirect('/employees');
});

// Attendance
router.get('/attendance', requireRole('admin', 'hr'), (req, res) => {
  const rows = db.prepare(`
    SELECT a.*, e.employee_code FROM attendance a
    JOIN employees e ON e.id = a.employee_id
    ORDER BY a.date DESC, e.employee_code ASC
  `).all();
  const employees = db.prepare('SELECT id, employee_code FROM employees ORDER BY employee_code').all();
  res.render('attendance', { rows, employees });
});

router.post('/attendance', requireRole('admin', 'hr'), (req, res) => {
  const { employee_id, date, status } = req.body;
  db.prepare(`INSERT INTO attendance (employee_id, date, status)
              VALUES (?, ?, ?)
              ON CONFLICT(employee_id, date) DO UPDATE SET status=excluded.status`)
    .run(Number(employee_id), date, status);
  res.redirect('/attendance');
});

// Payroll
router.get('/payroll', requireRole('admin', 'hr'), (req, res) => {
  const rows = db.prepare(`SELECT p.*, e.employee_code FROM payroll p JOIN employees e ON e.id = p.employee_id ORDER BY p.month DESC`).all();
  const employees = db.prepare('SELECT id, employee_code, base_salary FROM employees ORDER BY employee_code').all();
  res.render('payroll', { rows, employees });
});

router.post('/payroll/generate', requireRole('admin', 'hr'), (req, res) => {
  const { employee_id, month } = req.body; // month: YYYY-MM
  const employee = db.prepare('SELECT * FROM employees WHERE id = ?').get(Number(employee_id));
  if (!employee) return res.redirect('/payroll');
  // Simple payroll formula
  const basic = Number(employee.base_salary || 0);
  const hra = Math.round(basic * 0.4);
  const allowances = Math.round(basic * 0.1);
  // Count absences for deductions (simple example)
  const absentCount = db.prepare(`SELECT COUNT(1) c FROM attendance WHERE employee_id=? AND status='absent' AND substr(date,1,7)=?`).get(employee.id, month).c;
  const perDay = Math.round(basic / 30);
  const deductions = perDay * absentCount;
  const net_pay = basic + hra + allowances - deductions;
  db.prepare(`INSERT INTO payroll (employee_id, month, basic, hra, allowances, deductions, net_pay)
              VALUES (?, ?, ?, ?, ?, ?, ?)
              ON CONFLICT(employee_id, month) DO UPDATE SET basic=excluded.basic, hra=excluded.hra, allowances=excluded.allowances, deductions=excluded.deductions, net_pay=excluded.net_pay`)
    .run(employee.id, month, basic, hra, allowances, deductions, net_pay);
  res.redirect('/payroll');
});

module.exports = router;


