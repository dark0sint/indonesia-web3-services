const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['ASN', 'Citizen'], default: 'Citizen' },
    walletAddress: { type: String, required: true, unique: true },
}, { timestamps: true });

module.exports = mongoose.model('User ', UserSchema);
