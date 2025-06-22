const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const jobSchema = new mongoose.Schema({
    clientId: { 
        type: ObjectId, 
        ref: 'Client', 
        required: true 
    },
    title: { 
        type: String, 
        required: true,
        trim: true,
        maxlength: 100
    },
    description: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true,
        min: 0
    },
    tasks: [{ 
        type: String,
        trim: true
    }],
    tags: [{ 
        type: String,
        trim: true
    }],
    duration: { 
        type: String,
        enum: ['1 month', '3 months', '6 months'],
        default: '3 months'
    },
    location: { 
        type: String,
        enum: ['Lagos', 'Abuja', 'Remote'],
        default: 'Lagos'
    },
    workersNeeded: { 
        type: Number,
        default: 1,
        min: 1,
        max: 20
    },
    deadline: { 
        type: Date,
        required: true
    },
    status: { 
        type: String,
        enum: ['draft', 'active', 'completed', 'cancelled'],
        default: 'draft'
    },
    applications: [{ 
        type: ObjectId, 
        ref: 'Application' 
    }],
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Indexes
jobSchema.index({ clientId: 1 });
jobSchema.index({ status: 1 });
jobSchema.index({ deadline: 1 });
jobSchema.index({ title: 'text', description: 'text' });

// Virtual for applications count
jobSchema.virtual('applicationsCount').get(function() {
    return this.applications ? this.applications.length : 0;
});

module.exports = mongoose.model('Job', jobSchema);