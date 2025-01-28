const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  res.render('index', { error: null });
});

app.post('/submit', (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Server-side validation
  if (!name || !email || !password || !confirmPassword) {
    return res.render('index', { error: 'All fields are required!' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.render('index', { error: 'Invalid email format!' });
  }

  if (password.length < 8) {
    return res.render('index', { error: 'Password must be at least 8 characters long!' });
  }

  if (password !== confirmPassword) {
    return res.render('index', { error: 'Passwords do not match!' });
  }

  // If validation passes
  res.render('index', { error: 'Form submitted successfully!' });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
