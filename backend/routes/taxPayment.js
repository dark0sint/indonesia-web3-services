const express = require('express');
const auth = require('../middleware/authMiddleware');
const { createTaxPayment, getTaxPayments } = require('../controllers/taxPaymentController');

const router = express.Router();

router.post('/', auth, createTaxPayment);
router.get('/', auth, getTaxPayments);

module.exports = router;
