const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: false
    },
    otpEnabled: {
        type: Boolean,
        default: false
    },
    otpSecret: {
        type: String,
        required: false
    },
    wearableDevice: {
        type: String,
        enum: ['none', 'apple', 'fitbit'],
        default: 'none'
    },
    healthProfile: {
        vitals: [{
            heartRate: Number,
            oxygenLevel: Number,
            timestamp: Date
        }],
        medications: [{
            name: String,
            dosage: String,
            frequency: String
        }],
        allergies: [String],
        conditions: [String]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema); 