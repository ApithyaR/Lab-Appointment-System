const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')

// Import routes
const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
// const patientRoutes = require('./routes/patientRoutes');
const testRoutes = require('./routes/testRoutes');
const testResultRoutes = require('./routes/testResultRoutes');
const userRoutes = require('./routes/userRoutes');
const timeslotRoutes = require('./routes/timeslotRoutes');

// Import other route files as needed

// Load environment variables
dotenv.config({ path: './config/config.env' });

// Initialize Express app
const app = express();

app.use(cors())

// Middleware
app.use(express.json());

// Mount routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/appointments', appointmentRoutes);
// app.use('/api/v1/patients', patientRoutes);
app.use('/api/v1/tests', testRoutes);
app.use('/api/v1/test-results', testResultRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/timeslot', timeslotRoutes);
// Mount other routes as needed

// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});