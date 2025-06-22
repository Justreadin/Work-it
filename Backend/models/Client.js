// models/Client.js
const User = require('./User');
const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        index: true,
        trim: true,
        maxlength: 100
    },
    companySize: {
        type: String,
        enum: ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'],
        required: true
    },
    industry: {
        type: String,
        required: true,
        maxlength: 100
    },
    website: {
        type: String,
        validate: {
            validator: v => /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(v),
            message: props => `${props.value} is not a valid URL!`
        }
    },
    companyDescription: {
        type: String,
        maxlength: 1000
    },
    companyLogo: String,  // Added for logo support
    hiringPreferences: {
        type: [String],
        enum: ['Full-time', 'Part-time', 'Contract', 'Freelance'],
        default: []
    },
    contactPerson: {      // Added for contact info
        name: String,
        position: String,
        phone: String
    },
    paymentVerified: {
        type: Boolean,
        default: false
    },
    projects: [{
        title: String,
        description: String,
        skillsRequired: [String],
        budget: Number,
        timeline: String
    }]
}, { timestamps: true });

// Indexes
clientSchema.index({ companyName: 1 });
clientSchema.index({ industry: 1 });
clientSchema.index({ 'hiringPreferences': 1 });

const Client = User.discriminator('Client', clientSchema);

module.exports = Client;