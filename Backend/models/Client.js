// models/Client.js
const User = require('./User');
const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    companyName: {
        type: String,
        index: true
    },
    companySize: {
        type: String,
        enum: ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+']
    },
    industry: String,
    website: String,
    companyDescription: String,
    hiringPreferences: {
        type: [String],
        enum: ['Full-time', 'Part-time', 'Contract', 'Freelance']
    },
    projects: [{
        title: String,
        description: String,
        skillsRequired: [String],
        budget: Number,
        timeline: String
    }],
    paymentVerified: {
        type: Boolean,
        default: false
    }
});

// Add indexes
clientSchema.index({ companyName: 1 });
clientSchema.index({ industry: 1 });
clientSchema.index({ 'hiringPreferences': 1 });

const Client = User.discriminator('Client', clientSchema);

module.exports = Client;