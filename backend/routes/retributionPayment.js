const express = require('express');
const auth = require('../middleware/authMiddleware');
const { createRetributionPayment, getRetributionPayments } = require('../controllers/retributionPaymentController');

const router = express.Router();

router.post('/', auth, createRetributionPayment);
router.get('/', auth, getRetributionPayments);

module.exports = router;
