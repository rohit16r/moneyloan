const User = require('../models/User');

const authController = {
    // Register User
    register: async (req, res) => {
        try {
            const { name, email, password, phone, address, aadharNumber } = req.body;
            
            // Check if user exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.render('register', { 
                    error: 'User already exists with this email',
                    formData: req.body
                });
            }

            // Create new user
            const user = new User({
                name,
                email,
                password,
                phone,
                address,
                aadharNumber
            });

            await user.save();
            
            // Set session
            req.session.user = {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            };
            
            res.redirect('/dashboard');
        } catch (error) {
            console.error('Registration error:', error);
            res.render('register', { 
                error: 'Error creating account. Please try again.',
                formData: req.body
            });
        }
    },

    // Login User
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            
            // Find user
            const user = await User.findOne({ email });
            if (!user) {
                return res.render('login', { 
                    error: 'Invalid email or password',
                    formData: req.body
                });
            }

            // Check password
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return res.render('login', { 
                    error: 'Invalid email or password',
                    formData: req.body
                });
            }

            // Set session
            req.session.user = {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            };

            // Redirect based on role
            if (user.role === 'admin') {
                res.redirect('/admin/dashboard');
            } else {
                res.redirect('/dashboard');
            }
        } catch (error) {
            console.error('Login error:', error);
            res.render('login', { 
                error: 'Error logging in. Please try again.',
                formData: req.body
            });
        }
    },

    // Logout
    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                console.error('Logout error:', err);
            }
            res.redirect('/');
        });
    }
};

module.exports = authController;