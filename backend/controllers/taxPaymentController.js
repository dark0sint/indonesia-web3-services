const TaxPayment = require('../models/TaxPayment');

exports.createTaxPayment = async (req, res) => {
    try {
        const { amount, txHash } = req.body;
        const payment = new TaxPayment({
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

exports.getTaxPayments = async (req, res) => {
    try {
        let payments;
        if (req.user.role === 'ASN') {
            payments = await TaxPayment.find().populate('payer', 'username');
        } else {
            payments = await TaxPayment.find({ payer: req.user.id });
        }
        res.json(payments);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
