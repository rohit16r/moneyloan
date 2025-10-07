const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Login routes
router.get('/login', (req, res) => {
    if (req.session.user) {
        return res.redirect('/dashboard');
    }
    res.render('login');
});

router.post('/login', authController.login);

// Register routes
router.get('/register', (req, res) => {
    if (req.session.user) {
        return res.redirect('/dashboard');
    }
    res.render('register');
});

router.post('/register', authController.register);

// Logout
router.get('/logout', authController.logout);

module.exports = router;