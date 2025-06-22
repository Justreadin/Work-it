const { getDb } = require("../../config/db");
const { ObjectId } = require("mongodb");

const createJob = async (req, res) => {
    try {
        const jobData = {
            ...req.body,
            clientId: req.user.userId,
            status: 'active',
            createdAt: new Date(),
            updatedAt: new Date(),
            applications: []
        };

        const result = await getDb().collection('jobs').insertOne(jobData);
        
        res.status(201).json({
            success: true,
            message: "Job created successfully",
            data: { 
                ...jobData, 
                _id: result.insertedId 
            }
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: "Failed to create job",
            ...(process.env.NODE_ENV === 'development' && { details: error.message })
        });
    }
};

// Get all jobs for a client
const getJobs = async (req, res) => {
    try {
        const jobs = await getDb().collection('jobs')
            .find({ clientId: req.user.userId })
            .sort({ createdAt: -1 })
            .toArray();
        
        res.json({ success: true, data: jobs });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: "Failed to fetch jobs" 
        });
    }
};

// Get job details
const getJobDetails = async (req, res) => {
    try {
        const job = await getDb().collection('jobs')
            .findOne({ 
                _id: new ObjectId(req.params.id),
                clientId: req.user.userId 
            });
        
        if (!job) {
            return res.status(404).json({ 
                success: false,
                error: "Job not found" 
            });
        }

        res.json({ success: true, data: job });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: "Failed to fetch job details" 
        });
    }
};

// Update a job
const updateJob = async (req, res) => {
    try {
        const result = await getDb().collection('jobs')
            .updateOne(
                { 
                    _id: new ObjectId(req.params.id),
                    clientId: req.user.userId 
                },
                { 
                    $set: { 
                        ...req.body,
                        updatedAt: new Date() 
                    } 
                }
            );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ 
                success: false,
                error: "Job not found or no changes made" 
            });
        }

        res.json({ success: true, message: "Job updated successfully" });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: "Failed to update job" 
        });
    }
};

// Delete a job
const deleteJob = async (req, res) => {
    try {
        const result = await getDb().collection('jobs')
            .deleteOne({ 
                _id: new ObjectId(req.params.id),
                clientId: req.user.userId 
            });

        if (result.deletedCount === 0) {
            return res.status(404).json({ 
                success: false,
                error: "Job not found" 
            });
        }

        res.json({ success: true, message: "Job deleted successfully" });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: "Failed to delete job" 
        });
    }
};

// Shuffle applications
const shuffleApplications = async (req, res) => {
    try {
        // Implementation depends on your shuffle logic
        // This is a placeholder implementation
        const job = await getDb().collection('jobs')
            .findOne({ 
                _id: new ObjectId(req.params.id),
                clientId: req.user.userId 
            });

        if (!job) {
            return res.status(404).json({ 
                success: false,
                error: "Job not found" 
            });
        }

        // Your shuffle algorithm here
        const shuffledApplications = [...job.applications].sort(() => Math.random() - 0.5);

        await getDb().collection('jobs').updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: { applications: shuffledApplications } }
        );

        res.json({ 
            success: true,
            message: "Applications shuffled successfully",
            data: shuffledApplications 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: "Failed to shuffle applications" 
        });
    }
};

// Get job applications
const getJobApplications = async (req, res) => {
    try {
        const applications = await getDb().collection('applications')
            .aggregate([
                { $match: { jobId: new ObjectId(req.params.id) } },
                {
                    $lookup: {
                        from: "workers",
                        localField: "workerId",
                        foreignField: "userId",
                        as: "worker"
                    }
                },
                { $unwind: "$worker" }
            ]).toArray();

        res.json({ success: true, data: applications });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: "Failed to fetch applications" 
        });
    }
};

module.exports = {
    createJob,
    getJobs,
    getJobDetails,
    updateJob,
    deleteJob,
    shuffleApplications,
    getJobApplications
};