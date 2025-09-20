const express = require('express');
const auth = require('../middleware/authMiddleware');
const {
    createRequest,
    getRequests,
    updateRequestStatus,
} = require('../controllers/researchDataController');

const router = express.Router();

router.post('/', auth, createRequest);
router.get('/', auth, getRequests);
router.patch('/:id/status', auth, updateRequestStatus);

module.exports = router;
