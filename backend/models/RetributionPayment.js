const mongoose = require('mongoose');

const RetributionPaymentSchema = new mongoose.Schema({
    payer: { type: mongoose.Schema.Types.ObjectId, ref: 'User ', required: true },
    amount: { type: Number, required: true },
    txHash: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Confirmed'], default: 'Pending' },
}, { timestamps: true });

module.exports = mongoose.model('RetributionPayment', RetributionPaymentSchema);
