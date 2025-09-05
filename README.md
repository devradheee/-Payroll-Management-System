# 💼 Payroll Management System

A comprehensive web-based payroll management system built with Node.js, Express.js, SQLite, and EJS templates. This system provides complete employee management, attendance tracking, and automated payroll generation capabilities.

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Express.js](https://img.shields.io/badge/Express.js-5.1.0-blue)
![SQLite](https://img.shields.io/badge/SQLite-3-lightblue)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-purple)
![License](https://img.shields.io/badge/License-ISC-yellow)

## 🚀 Features

### 👥 Employee Management
- **Complete CRUD Operations** - Add, view, edit, and delete employee records
- **Employee Codes** - Unique identification system for each employee
- **Department & Designation** - Organized employee categorization
- **Salary Management** - Base salary configuration with automatic calculations

### 📅 Attendance Tracking
- **Daily Attendance** - Mark present, absent, or leave status
- **Date-wise Records** - Track attendance for specific dates
- **Employee-specific Views** - Individual attendance history
- **Leave Management** - Integrated leave tracking system

### 💰 Payroll Generation
- **Automatic Calculations** - HRA, allowances, and deductions
- **Monthly Payroll** - Generate payroll for specific months
- **Net Pay Calculation** - Comprehensive salary computation
- **Historical Records** - Maintain payroll history for each employee

### 🔐 Security & Authentication
- **Session-based Authentication** - Secure user login system
- **Role-based Access Control** - Admin, HR, and Employee roles
- **Password Encryption** - bcrypt hashing for secure password storage
- **CSRF Protection** - Cross-site request forgery prevention
- **Input Validation** - Comprehensive data validation and sanitization

### 🎨 Modern UI/UX
- **Responsive Design** - Bootstrap 5 framework
- **Mobile-friendly** - Works seamlessly on all devices
- **Intuitive Interface** - User-friendly navigation and forms
- **Flash Messages** - Real-time feedback and notifications

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **SQLite** - Lightweight database with better-sqlite3
- **bcrypt** - Password hashing and authentication
- **express-session** - Session management
- **helmet** - Security middleware
- **morgan** - HTTP request logger

### Frontend
- **EJS** - Embedded JavaScript templating
- **Bootstrap 5** - CSS framework for responsive design
- **Custom CSS** - Additional styling and animations

### Security
- **CSRF Protection** - Cross-site request forgery prevention
- **Input Validation** - Data sanitization and validation
- **Secure Sessions** - HTTP-only cookies with proper configuration
- **Password Hashing** - bcrypt with configurable rounds

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download here](https://git-scm.com/)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/devradheee/-Payroll-Management-System.git
cd -Payroll-Management-System
```

### 2. Install Dependencies
```bash
cd payroll-management-system
npm install
```

### 3. Environment Configuration
Create a `.env` file in the `payroll-management-system` directory:
```bash
# Server Configuration
PORT=3000
NODE_ENV=development

# Security (CHANGE THIS IN PRODUCTION!)
SESSION_SECRET=your_very_secure_session_secret_key_here

# Application
APP_NAME=Payroll Management System
APP_URL=http://localhost:3000

# Database
DB_PATH=./data.sqlite

# Security
BCRYPT_ROUNDS=10
```

### 4. Initialize Database
```bash
node src/seed.js
```

### 5. Start the Application
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

### 6. Access the Application
Open your browser and navigate to:
```
http://localhost:3000
```

## 🔑 Default Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@payroll.local | admin123 |

## 📁 Project Structure

```
Payroll-Management-System/
├── payroll-management-system/
│   ├── src/
│   │   ├── app.js          # Main Express application
│   │   ├── auth.js         # Authentication helpers
│   │   ├── db.js           # Database setup & migrations
│   │   ├── routes.js       # Application routes
│   │   └── seed.js         # Database seeding
│   ├── views/              # EJS templates
│   │   ├── layout.ejs      # Main layout template
│   │   ├── index.ejs       # Dashboard
│   │   ├── login.ejs       # Login page
│   │   ├── employees.ejs   # Employee management
│   │   ├── attendance.ejs  # Attendance tracking
│   │   └── payroll.ejs     # Payroll generation
│   ├── public/
│   │   └── css/
│   │       └── styles.css  # Custom styles
│   ├── data.sqlite         # SQLite database
│   ├── sessions.sqlite     # Session storage
│   ├── package.json        # Dependencies
│   └── README.md           # Server documentation
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## 🗄️ Database Schema

### Users Table
- `id` - Primary key
- `name` - User's full name
- `email` - Unique email address
- `password_hash` - Encrypted password
- `role` - User role (admin, hr, employee)
- `created_at` - Account creation timestamp

### Employees Table
- `id` - Primary key
- `user_id` - Foreign key to users table
- `employee_code` - Unique employee identifier
- `department` - Employee department
- `designation` - Job title/position
- `join_date` - Employment start date
- `base_salary` - Monthly base salary

### Attendance Table
- `id` - Primary key
- `employee_id` - Foreign key to employees table
- `date` - Attendance date
- `status` - present, absent, or leave
- `UNIQUE(employee_id, date)` - One record per employee per day

### Payroll Table
- `id` - Primary key
- `employee_id` - Foreign key to employees table
- `month` - Payroll month (YYYY-MM format)
- `basic` - Basic salary amount
- `hra` - House Rent Allowance
- `allowances` - Additional allowances
- `deductions` - Salary deductions
- `net_pay` - Final calculated salary
- `generated_at` - Payroll generation timestamp

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start the application in production mode |
| `npm run dev` | Start the application in development mode with auto-restart |
| `npm test` | Run tests (currently placeholder) |

## 🌟 Key Features Explained

### Employee Management
- Add new employees with unique employee codes
- Update employee information and salary details
- View comprehensive employee listings
- Delete employee records (with proper data integrity)

### Attendance System
- Mark daily attendance for all employees
- Track present, absent, and leave status
- View attendance history by date and employee
- Generate attendance reports

### Payroll Generation
- Automatic calculation of HRA (House Rent Allowance)
- Configurable allowances and deductions
- Monthly payroll generation with net pay calculation
- Historical payroll data maintenance

### Security Features
- Secure password hashing using bcrypt
- Session-based authentication with SQLite storage
- CSRF protection for all forms
- Input validation and sanitization
- Role-based access control

## 🚀 Deployment

### Environment Variables for Production
```bash
NODE_ENV=production
PORT=3000
SESSION_SECRET=your_very_secure_production_secret
APP_NAME=Payroll Management System
APP_URL=https://yourdomain.com
```

### Security Considerations
- Change the default `SESSION_SECRET` in production
- Use HTTPS in production environments
- Regularly update dependencies
- Implement proper backup strategies for the database
- Consider using environment-specific database configurations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Radheshyam Kumar**
- GitHub: [@devradheee](https://github.com/devradheee)
- Repository: [Payroll Management System](https://github.com/devradheee/-Payroll-Management-System)

## 🙏 Acknowledgments

- Express.js community for the excellent framework
- Bootstrap team for the responsive CSS framework
- SQLite team for the lightweight database solution
- All open-source contributors who made this project possible

## 📞 Support

If you encounter any issues or have questions, please:
1. Check the [Issues](https://github.com/devradheee/-Payroll-Management-System/issues) page
2. Create a new issue with detailed information
3. Contact the maintainer

---

⭐ **Star this repository if you found it helpful!**
