const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const applicationSchema = new mongoose.Schema({
    jobId: { 
        type: ObjectId, 
        ref: 'Job', 
        required: true 
    },
    workerId: { 
        type: ObjectId, 
        ref: 'Worker', 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['pending', 'shortlisted', 'hired', 'rejected'],
        default: 'pending'
    },
    appliedAt: { 
        type: Date, 
        default: Date.now 
    },
    notes: String,
    rating: { 
        type: Number, 
        min: 1, 
        max: 5 
    },
    feedback: String
});

// Indexes
applicationSchema.index({ jobId: 1 });
applicationSchema.index({ workerId: 1 });
applicationSchema.index({ status: 1 });
applicationSchema.index({ jobId: 1, workerId: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);