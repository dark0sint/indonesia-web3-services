const express = require('express');
const auth = require('../middleware/authMiddleware');
const { sendMessage, getMessages } = require('../controllers/communicationController');

const router = express.Router();

router.post('/', auth, sendMessage);
router.get('/:userId', auth, getMessages);

module.exports = router;
