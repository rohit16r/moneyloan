const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    interestRate: {
        type: Number,
        default: 12
    },
    tenure: {
        type: Number,
        required: true
    },
    purpose: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'disbursed'],
        default: 'pending'
    },
    emi: {
        type: Number
    },
    appliedDate: {
        type: Date,
        default: Date.now
    },
    approvedDate: Date
});

// Calculate EMI before saving
loanSchema.pre('save', function(next) {
    if (this.amount && this.interestRate && this.tenure) {
        const monthlyRate = this.interestRate / 12 / 100;
        const emi = this.amount * monthlyRate * Math.pow(1 + monthlyRate, this.tenure) / 
                   (Math.pow(1 + monthlyRate, this.tenure) - 1);
        this.emi = Math.round(emi * 100) / 100;
    }
    next();
});

module.exports = mongoose.model('Loan', loanSchema);