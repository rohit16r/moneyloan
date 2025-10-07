
const express = require('express');
const router = express.Router();
const Loan = require('../models/Loan'); // Adjust path if needed

// Home page
router.get('/home', (req, res) => {
  res.render('home.ejs', { error: null });
});

// Loan Products
router.get('/loanproduct', (req, res) => {
  res.render('loanProduct'); // No .ejs needed
});

// Rates & Fees
router.get('/rates', (req, res) => {
  res.render(' ratefee.ejs');
});

// How It Works
router.get('/works', (req, res) => {
  res.render('howitswork.ejs');
});

// About Us
router.get('/about', (req, res) => {
  res.render('abouts.ejs');
});

// Contact
router.get('/contacts', (req, res) => {
  res.render('contacts.ejs');
});
// signup
router.get('/signup', (req, res) => {
    res.render('register.ejs');
  });
  //login
  router.get('/login', (req, res) => {
    res.render('login.ejs');
  });
// Apply Now
router.get('/applynow', (req, res) => {
  // res.render('login.ejs');
  res.render('apply-loan.ejs');
});

// Dashboard (protected)
router.get('/dashboard', async (req, res) => {
  if (!req.session.user) return res.redirect('/login');

  try {
    const loans = await Loan.find({ userId: req.session.user.id }).sort({ appliedDate: -1 });
    res.render('dashboard', { user: req.session.user, loans });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.render('dashboard', { error: 'Error loading dashboard', loans: [] });
  }
});

module.exports = router;