const express = require('express');
const router = express.Router();
const Loan = require('../models/Loan');

// Middleware to check if user is logged in
const requireAuth = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
};

// Apply for loan page
router.get('/apply', requireAuth, (req, res) => {
    res.render('apply-loan', { user: req.session.user });
});

// Submit loan application
router.post('/apply', requireAuth, async (req, res) => {
    try {
        const { amount, tenure, purpose, interestRate = 12 } = req.body;
        const userId = req.session.user.id;

        const loan = new Loan({
            userId,
            amount: parseFloat(amount),
            tenure: parseInt(tenure),
            purpose,
            interestRate: parseFloat(interestRate)
        });

        await loan.save();
        res.redirect('/dashboard');
    } catch (error) {
        console.error('Loan application error:', error);
        res.render('apply-loan', { 
            user: req.session.user,
            error: 'Error submitting loan application',
            formData: req.body
        });
    }
});

// Get loan details
router.get('/:id', requireAuth, async (req, res) => {
    try {
        const loanId = req.params.id;
        const userId = req.session.user.id;
        
        const loan = await Loan.findOne({ _id: loanId, userId });
        if (!loan) {
            return res.redirect('/dashboard');
        }

        res.render('loan-details', {
            user: req.session.user,
            loan
        });
    } catch (error) {
        console.error('Loan details error:', error);
        res.redirect('/dashboard');
    }
});

// EMI calculator API
router.post('/calculate-emi', (req, res) => {
    try {
        const { amount, interestRate = 12, tenure } = req.body;
        
        const principal = parseFloat(amount);
        const rate = parseFloat(interestRate) / 12 / 100;
        const time = parseInt(tenure);
        
        const emi = principal * rate * Math.pow(1 + rate, time) / 
                   (Math.pow(1 + rate, time) - 1);
        
        const totalPayment = emi * time;
        const totalInterest = totalPayment - principal;
        
        res.json({
            emi: Math.round(emi),
            totalPayment: Math.round(totalPayment),
            totalInterest: Math.round(totalInterest)
        });
    } catch (error) {
        res.status(500).json({ error: 'EMI calculation failed' });
    }
});

module.exports = router;