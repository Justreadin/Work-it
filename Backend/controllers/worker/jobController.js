const { getDb } = require("../../config/db");
const db = getDb();

const applyForJob = async (req, res) => {
    const { userId } = req.user;
    const { jobId } = req.body;

    try {
        // Check if job exists
        const job = await db.collection('jobs').findOne({ _id: jobId });
        if (!job) return res.status(404).json({ error: "Job not found" });

        // Add application
        await db.collection('applications').insertOne({
            workerId: userId,
            jobId,
            status: 'pending',
            appliedAt: new Date()
        });

        res.json({ message: "Application submitted" });
    } catch (error) {
        res.status(500).json({ error: "Failed to apply" });
    }
};

module.exports = {
    applyForJob
};