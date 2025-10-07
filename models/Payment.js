const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    loanId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Loan',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    paymentDate: Date,
    status: {
        type: String,
        enum: ['pending', 'paid', 'overdue'],
        default: 'pending'
    },
    penalty: {
        type: Number,
        default: 0
    },
    month: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Payment', paymentSchema);