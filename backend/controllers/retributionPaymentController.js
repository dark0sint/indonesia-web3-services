const RetributionPayment = require('../models/RetributionPayment');

exports.createRetributionPayment = async (req, res) => {
    try {
        const { amount, txHash } = req.body;
        const payment = new RetributionPayment({
            payer: req.user.id,
            amount,
            txHash,
            status: 'Pending',
        });
        await payment.save();
        res.status(201).json(payment);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getRetributionPayments = async (req, res) => {
    try {
        let payments;
        if (req.user.role === 'ASN') {
            payments = await RetributionPayment.find().populate('payer', 'username');
        } else {
            payments = await RetributionPayment.find({ payer: req.user.id });
        }
        res.json(payments);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
