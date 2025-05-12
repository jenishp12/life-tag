const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Successfully connected to MongoDB.');
})
.catch((error) => {
    console.error('MongoDB connection error:', error);
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
});

// Middleware to verify JWT token
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id });
        if (!user) throw new Error();
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Please authenticate.' });
    }
};

// Register new user
app.post('/api/users/register', async (req, res) => {
    try {
        console.log('Registration attempt with data:', { 
            username: req.body.username, 
            email: req.body.email 
        });

        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            console.log('User already exists:', existingUser.email);
            return res.status(400).json({ error: 'User already exists' });
        }

        // Create new user
        const user = new User({
            username,
            email,
            password
        });

        console.log('Saving new user...');
        await user.save();
        console.log('User saved successfully:', user.email);

        // Generate token
        const token = jwt.sign({ _id: user._id }, JWT_SECRET);
        console.log('Token generated for new user');
        
        res.status(201).json({ user, token });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Error creating user' });
    }
});

// Login user
app.post('/api/users/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login attempt for email:', email);

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found');
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        console.log('User found:', user.username);

        // Check password
        const isMatch = await user.comparePassword(password);
        console.log('Password match:', isMatch);
        if (!isMatch) {
            console.log('Password does not match');
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign({ _id: user._id }, JWT_SECRET);
        console.log('Token generated successfully');
        res.json({ user, token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Error logging in' });
    }
});

// Get user profile
app.get('/api/users/profile', auth, async (req, res) => {
    try {
        res.json(req.user);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching profile' });
    }
});

// Change password
app.post('/api/users/change-password', auth, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = req.user;

        // Verify current password
        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
            return res.status(400).json({ error: 'Current password is incorrect' });
        }

        // Update password
        user.password = newPassword;
        await user.save();

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating password' });
    }
});

// Setup OTP
app.post('/api/users/setup-otp', auth, async (req, res) => {
    try {
        const { phoneNumber, otpCode } = req.body;
        const user = req.user;

        // Here you would typically verify the OTP code
        // For now, we'll just update the phone number
        user.phoneNumber = phoneNumber;
        user.otpEnabled = true;
        await user.save();

        res.json({ message: 'OTP setup successful' });
    } catch (error) {
        res.status(500).json({ error: 'Error setting up OTP' });
    }
});

// Connect wearable device
app.post('/api/users/connect-wearable', auth, async (req, res) => {
    try {
        const { type } = req.body;
        const user = req.user;

        // Update user's wearable device
        user.wearableDevice = type;
        await user.save();

        res.json({ message: 'Wearable device connected successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error connecting wearable device' });
    }
});

// Export health profile
app.get('/api/users/export-health-profile', auth, async (req, res) => {
    try {
        const user = req.user;
        // Here you would generate the PDF
        // For now, we'll just send a success message
        res.json({ message: 'Health profile exported successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error exporting health profile' });
    }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 
