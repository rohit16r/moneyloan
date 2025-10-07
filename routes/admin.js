const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Middleware to check if user is admin
const requireAdmin = (req, res, next) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
        return res.redirect('/login');
    }
    next();
};

// Admin dashboard
router.get('/dashboard', requireAdmin, adminController.getDashboard);

// Loans management
router.get('/loans', requireAdmin, adminController.getAllLoans);
router.post('/loans/:id/approve', requireAdmin, adminController.approveLoan);
router.post('/loans/:id/reject', requireAdmin, adminController.rejectLoan);

// Users management
router.get('/users', requireAdmin, adminController.getAllUsers);

module.exports = router;