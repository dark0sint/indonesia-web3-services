const express = require('express');
const cors = require('cors');
const mongoose = require('./config/db');
const authRoutes = require('./routes/auth');
const researchDataRoutes = require('./routes/researchData');
const taxPaymentRoutes = require('./routes/taxPayment');
const retributionPaymentRoutes = require('./routes/retributionPayment');
const communicationRoutes = require('./routes/communication');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/research', researchDataRoutes);
app.use('/api/tax', taxPaymentRoutes);
app.use('/api/retribution', retributionPaymentRoutes);
app.use('/api/communication', communicationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
