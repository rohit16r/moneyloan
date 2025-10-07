const express = require('express');
const router = express.Router();
const User = require('../models/User');

const requireAuth = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
};

// User profile page
router.get('/profile', requireAuth, async (req, res) => {
    try {
        const userId = req.session.user.id;
        const user = await User.findById(userId).select('-password');
        
        res.render('profile', {
            user: req.session.user,
            profile: user
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.redirect('/dashboard');
    }
});

// Update user profile
router.post('/profile', requireAuth, async (req, res) => {
    try {
        const userId = req.session.user.id;
        const { name, phone, address } = req.body;
        
        await User.findByIdAndUpdate(userId, {
            name,
            phone,
            address
        });

        // Update session
        req.session.user.name = name;
        
        res.redirect('/profile');
    } catch (error) {
        console.error('Update profile error:', error);
        res.render('profile', {
            error: 'Error updating profile'
        });
    }
});

module.exports = router;