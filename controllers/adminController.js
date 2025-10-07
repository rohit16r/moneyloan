const Loan = require('../models/Loan');
const User = require('../models/User');

const adminController = {
    // Admin Dashboard
    getDashboard: async (req, res) => {
        try {
            const pendingLoans = await Loan.find({ status: 'pending' })
                .populate('userId', 'name email phone')
                .sort({ appliedDate: -1 });
                
            const allLoans = await Loan.find()
                .populate('userId', 'name email')
                .sort({ appliedDate: -1 })
                .limit(10);
                
            const usersCount = await User.countDocuments({ role: 'user' });
            const loansCount = await Loan.countDocuments();
            const approvedLoansCount = await Loan.countDocuments({ status: 'approved' });
            const totalLoanAmount = await Loan.aggregate([
                { $match: { status: 'approved' } },
                { $group: { _id: null, total: { $sum: '$amount' } } }
            ]);

            res.render('admin-dashboard', {
                user: req.session.user,
                pendingLoans,
                recentLoans: allLoans,
                stats: {
                    users: usersCount,
                    loans: loansCount,
                    approved: approvedLoansCount,
                    totalAmount: totalLoanAmount[0]?.total || 0
                }
            });
        } catch (error) {
            console.error('Admin dashboard error:', error);
            res.render('admin-dashboard', { 
                error: 'Error loading dashboard',
                pendingLoans: [],
                recentLoans: [],
                stats: {}
            });
        }
    },

    // Get All Loans for Admin
    getAllLoans: async (req, res) => {
        try {
            const loans = await Loan.find()
                .populate('userId', 'name email phone')
                .sort({ appliedDate: -1 });

            res.render('admin-loans', {
                user: req.session.user,
                loans
            });
        } catch (error) {
            console.error('Get all loans error:', error);
            res.render('admin-loans', { 
                error: 'Error loading loans',
                loans: [] 
            });
        }
    },

    // Get All Users for Admin
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find({ role: 'user' })
                .select('name email phone address aadharNumber createdAt')
                .sort({ createdAt: -1 });

            res.render('admin-users', {
                user: req.session.user,
                users
            });
        } catch (error) {
            console.error('Get users error:', error);
            res.render('admin-users', { 
                error: 'Error loading users',
                users: [] 
            });
        }
    },

    // Approve Loan
    approveLoan: async (req, res) => {
        try {
            const loanId = req.params.id;
            
            await Loan.findByIdAndUpdate(loanId, {
                status: 'approved',
                approvedDate: new Date()
            });

            res.redirect('/admin/loans');
        } catch (error) {
            console.error('Approve loan error:', error);
            res.redirect('/admin/loans');
        }
    },

    // Reject Loan
    rejectLoan: async (req, res) => {
        try {
            const loanId = req.params.id;
            
            await Loan.findByIdAndUpdate(loanId, {
                status: 'rejected',
                approvedDate: new Date()
            });

            res.redirect('/admin/loans');
        } catch (error) {
            console.error('Reject loan error:', error);
            res.redirect('/admin/loans');
        }
    }
};

module.exports = adminController;