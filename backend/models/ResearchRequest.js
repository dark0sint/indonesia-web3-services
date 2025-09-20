const mongoose = require('mongoose');

const ResearchRequestSchema = new mongoose.Schema({
    requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User ', required: true },
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    response: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('ResearchRequest', ResearchRequestSchema);
