const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

exports.register = async (req, res) => {
    const { username, password, role, walletAddress } = req.body;
    try {
        const existingUser  = await User.findOne({ username });
        if (existingUser ) return res.status(400).json({ message: 'Username already exists' });

        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User({ username, passwordHash, role, walletAddress });
        await user.save();

        res.status(201).json({ message: 'User  registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
