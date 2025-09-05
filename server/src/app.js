const path = require('path');
const express = require('express');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const methodOverride = require('method-override');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const flash = require('express-flash');

dotenv.config();

require('./db');
const { authenticate, findUserById } = require('./auth');
const router = require('./routes');

const app = express();
const expressLayouts = require('express-ejs-layouts');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');

app.use(helmet());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET || 'dev_secret',
  resave: false,
  saveUninitialized: false,
  store: new SQLiteStore({ 
    db: 'sessions.sqlite', 
    dir: path.join(__dirname, '..'),
    table: 'sessions'
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));
app.use(flash());

// user in locals
app.use((req, res, next) => {
  if (req.session.userId) {
    req.user = findUserById(req.session.userId);
  }
  res.locals.user = req.user || null;
  next();
});

// auth routes
app.get('/login', (req, res) => {
  res.render('login', { message: req.flash('error') });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = authenticate(email, password);
  if (!user) {
    req.flash('error', 'Invalid credentials');
    return res.redirect('/login');
  }
  req.session.userId = user.id;
  res.redirect('/');
});

app.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

app.use('/', router);

const port = process.env.PORT || 3000;
const appName = process.env.APP_NAME || 'Payroll Management System';

app.listen(port, () => {
  console.log(`🚀 ${appName} running at http://localhost:${port}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔐 Session secret: ${process.env.SESSION_SECRET ? '✅ Set' : '❌ Using default'}`);
});


