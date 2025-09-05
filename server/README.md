# Payroll Management System (Express + SQLite + EJS)

## 🚀 Quick Setup

1. **Install Node.js LTS** (v18 or higher)
2. **Clone and setup:**
   ```bash
   cd server
   npm install
   ```
3. **Configure environment:**
   ```bash
   # Copy the example file
   cp .env.example .env
   
   # Edit .env with your settings
   # At minimum, change SESSION_SECRET for security
   ```
4. **Initialize database:**
   ```bash
   node src/seed.js
   ```
5. **Start the application:**
   ```bash
   # Development mode (auto-restart)
   npm run dev
   
   # Production mode
   npm run start
   ```

## 🔧 Environment Configuration (.env)

The `.env` file contains all configuration settings. Here's what you need to know:

### **Required Settings:**
```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Security (CHANGE THIS!)
SESSION_SECRET=your_very_secure_session_secret_key_here
```

### **Optional Settings:**
```env
# Application
APP_NAME=Payroll Management System
APP_URL=http://localhost:3000

# Database
DB_PATH=./data.sqlite

# Security
BCRYPT_ROUNDS=10

# Email (for future features)
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_FROM=noreply@payroll.local
```

### **🔐 Security Notes:**
- **ALWAYS** change `SESSION_SECRET` in production
- Generate a strong secret: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- Set `NODE_ENV=production` for production deployment

## 🎯 Default Login
- **Email:** `admin@payroll.local`
- **Password:** `admin123`

## ✨ Features
- 🔐 **Authentication** - Session-based with role management
- 👥 **Employee Management** - CRUD operations with employee codes
- 📅 **Attendance Tracking** - Mark present/absent/leave
- 💰 **Payroll Generation** - Automatic calculation with HRA, allowances, deductions
- 🎨 **Modern UI** - Bootstrap 5 responsive design
- 🛡️ **Security** - CSRF protection, input validation, secure sessions

## 📁 Project Structure
```
server/
├── src/
│   ├── app.js          # Main Express application
│   ├── db.js           # Database setup & migrations
│   ├── auth.js         # Authentication helpers
│   ├── routes.js       # All application routes
│   └── seed.js         # Database seeding
├── views/              # EJS templates
├── public/             # Static assets (CSS, JS)
├── .env               # Environment configuration
├── .env.example       # Environment template
└── README.md          # This file
```


