const { getDb } = require("../../config/db");
const { ObjectId } = require('mongodb'); // Add this import
const db = getDb();

const applyForJob = async (req, res) => {
    const { userId } = req.user;
    const { jobId } = req.body;

    try {
         const db = getDb();
        
        // Validate jobId format
        if (!ObjectId.isValid(jobId)) {
            return res.status(400).json({ error: "Invalid job ID format" });
        }

        // Check if job exists
        const job = await db.collection('jobs').findOne({ _id: new ObjectId(jobId) });
        if (!job) return res.status(404).json({ error: "Job not found" });

        // Check if already applied
        const existingApplication = await db.collection('applications').findOne({
            workerId: userId,
            jobId: new ObjectId(jobId)
        });
        
        if (existingApplication) {
            return res.status(400).json({ error: "You've already applied to this job" });
        }

        // Add application
        await db.collection('applications').insertOne({
            workerId: userId,
            jobId: new ObjectId(jobId),
            status: 'pending',
            appliedAt: new Date()
        });

        // Update job's applications array
        await db.collection('jobs').updateOne(
            { _id: new ObjectId(jobId) },
            { $push: { applications: new ObjectId(userId) } }
        );

        res.json({ message: "Application submitted successfully" });
    } catch (error) {
        console.error("Application error:", error);
        res.status(500).json({ 
            error: "Failed to apply",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

module.exports = {
    applyForJob
};