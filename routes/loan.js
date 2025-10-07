// File: routes/loans.js
const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');

// Middleware to check if user is logged in
const requireAuth = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
};

// Apply for loan
router.get('/apply', requireAuth, (req, res) => {
    res.render('apply-loan', { user: req.session.user });
});

router.post('/apply', requireAuth, loanController.applyLoan);

// Get loan details
router.get('/:id', requireAuth, loanController.getLoanDetails);

// EMI calculator API
router.post('/calculate-emi', loanController.calculateEMI);

module.exports = router;