// models/Worker.js
const User = require('./User');
const mongoose = require('mongoose');

const workExperienceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: String,
    startDate: { type: Date, required: true },
    endDate: Date,
    currentlyWorking: Boolean,
    description: String
}, { _id: false });

const certificationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    issuingOrganization: { type: String, required: true },
    issueDate: Date,
    expirationDate: Date,
    credentialID: String,
    credentialURL: String
}, { _id: false });

const workerSchema = new mongoose.Schema({
    skills: {
        type: [String],
        validate: [arrayLimit, '{PATH} exceeds the limit of 20'],
        index: true
    },
    education: [educationSchema],
    workExperience: [workExperienceSchema],
    certifications: [certificationSchema],
    hourlyRate: {
        type: Number,
        min: 0
    },
    availability: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Contract', 'Freelance']
    },
    portfolio: [String], // Array of URLs
    ratings: {
        average: { type: Number, default: 0, min: 0, max: 5 },
        count: { type: Number, default: 0 }
    }
});

function arrayLimit(val) {
    return val.length <= 20;
}

// Add indexes
workerSchema.index({ skills: 1 });
workerSchema.index({ hourlyRate: 1 });
workerSchema.index({ availability: 1 });
workerSchema.index({ 'education.degree': 1 });
workerSchema.index({ 'education.institution': 1 });

const Worker = User.discriminator('Worker', workerSchema);

module.exports = Worker;