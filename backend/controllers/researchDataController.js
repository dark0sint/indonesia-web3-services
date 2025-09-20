const ResearchRequest = require('../models/ResearchRequest');

exports.createRequest = async (req, res) => {
    try {
        const { title, description } = req.body;
        const request = new ResearchRequest({
            requester: req.user.id,
            title,
            description,
        });
        await request.save();
        res.status(201).json(request);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getRequests = async (req, res) => {
    try {
        let requests;
        if (req.user.role === 'ASN') {
            requests = await ResearchRequest.find().populate('requester', 'username');
        } else {
            requests = await ResearchRequest.find({ requester: req.user.id });
        }
        res.json(requests);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateRequestStatus = async (req, res) => {
    if (req.user.role !== 'ASN') return res.status(403).json({ message: 'Forbidden' });
    try {
        const { id } = req.params;
        const { status, response } = req.body;
        const request = await ResearchRequest.findById(id);
        if (!request) return res.status(404).json({ message: 'Request not found' });

        request.status = status;
        request.response = response;
        await request.save();
        res.json(request);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
