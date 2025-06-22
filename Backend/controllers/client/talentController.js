const { getDb } = require("../../config/db");
const { ObjectId } = require("mongodb");

// Helper function to get client's job IDs
const getClientJobIds = async (userId) => {
    return await getDb().collection('jobs')
        .find({ clientId: new ObjectId(userId) })
        .project({ _id: 1 })
        .map(job => job._id)
        .toArray();
};

const getTalents = async (req, res) => {
    try {
        const jobIds = await getClientJobIds(req.user.userId);
        
        // Get unique worker IDs using aggregation instead of distinct
        const workerIds = await getDb().collection('applications')
            .aggregate([
                { $match: { jobId: { $in: jobIds } } },
                { $group: { _id: "$workerId" } }
            ])
            .map(doc => doc._id)
            .toArray();

        const talents = await getDb().collection('workers').aggregate([
            {
                $match: {
                    userId: { $in: workerIds }
                }
            },
            {
                $lookup: {
                    from: "applications",
                    let: { workerId: "$userId" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$workerId", "$$workerId"] },
                                        { $in: ["$jobId", jobIds] }
                                    ]
                                }
                            }
                        },
                        {
                            $lookup: {
                                from: "jobs",
                                localField: "jobId",
                                foreignField: "_id",
                                as: "job",
                                pipeline: [
                                    { $project: { title: 1 } }
                                ]
                            }
                        },
                        { $unwind: "$job" },
                        { 
                            $project: {
                                jobTitle: "$job.title",
                                status: 1,
                                appliedAt: 1,
                                jobId: 1,
                                _id: 0
                            } 
                        }
                    ],
                    as: "applications"
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    skills: 1,
                    education: 1,
                    workExperience: 1,
                    applications: 1
                }
            }
        ]).toArray();

        res.json({
            success: true,
            data: talents
        });
    } catch (error) {
        console.error("Error fetching talents:", error);
        res.status(500).json({ 
            success: false,
            error: "Failed to fetch talents",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Get hired talents
const getHiredTalents = async (req, res) => {
    try {
        const jobIds = await getClientJobIds(req.user.userId);
        
        const talents = await getDb().collection('workers').aggregate([
            {
                $match: {
                    userId: {
                        $in: await getDb().collection('applications')
                            .distinct('workerId', { 
                                jobId: { $in: jobIds },
                                status: "hired"
                            })
                    }
                }
            },
            {
                $lookup: {
                    from: "applications",
                    let: { workerId: "$userId" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$workerId", "$$workerId"] },
                                        { $in: ["$jobId", jobIds] },
                                        { $eq: ["$status", "hired"] }
                                    ]
                                }
                            }
                        },
                        {
                            $lookup: {
                                from: "jobs",
                                localField: "jobId",
                                foreignField: "_id",
                                as: "job",
                                pipeline: [
                                    { $project: { title: 1 } }
                                ]
                            }
                        },
                        { $unwind: "$job" },
                        { 
                            $project: {
                                jobTitle: "$job.title",
                                hiredAt: "$appliedAt",
                                jobId: 1,
                                _id: 0
                            } 
                        }
                    ],
                    as: "hiredJobs"
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    skills: 1,
                    hourlyRate: 1,
                    hiredJobs: 1
                }
            }
        ]).toArray();

        res.json({
            success: true,
            data: talents
        });
    } catch (error) {
        console.error("Error fetching hired talents:", error);
        res.status(500).json({ 
            success: false,
            error: "Failed to fetch hired talents",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Get specific talent details
const getTalentDetails = async (req, res) => {
    try {
        const jobIds = await getClientJobIds(req.user.userId);
        
        const talent = await getDb().collection('workers').aggregate([
            {
                $match: { _id: new ObjectId(req.params.id) }
            },
            {
                $lookup: {
                    from: "applications",
                    let: { workerId: "$userId" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$workerId", "$$workerId"] },
                                        { $in: ["$jobId", jobIds] }
                                    ]
                                }
                            }
                        },
                        {
                            $lookup: {
                                from: "jobs",
                                localField: "jobId",
                                foreignField: "_id",
                                as: "job",
                                pipeline: [
                                    { $project: { title: 1 } }
                                ]
                            }
                        },
                        { $unwind: "$job" },
                        { 
                            $project: {
                                jobTitle: "$job.title",
                                status: 1,
                                appliedAt: 1,
                                jobId: 1,
                                _id: 0
                            } 
                        }
                    ],
                    as: "applications"
                }
            },
            {
                $project: {
                    personalInformation: 1,
                    skills: 1,
                    education: 1,
                    workExperience: 1,
                    certifications: 1,
                    portfolio: 1,
                    applications: 1
                }
            }
        ]).next();

        if (!talent) {
            return res.status(404).json({ 
                success: false,
                error: "Talent not found" 
            });
        }

        res.json({
            success: true,
            data: talent
        });
    } catch (error) {
        console.error("Error fetching talent details:", error);
        res.status(500).json({ 
            success: false,
            error: "Failed to fetch talent details",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Hire a talent (unchanged as it doesn't have circular reference issues)
const hireTalent = async (req, res) => {
    try {
        const { applicationId } = req.body;
        const jobIds = await getClientJobIds(req.user.userId);
        
        const application = await getDb().collection('applications').findOne({
            _id: new ObjectId(applicationId),
            jobId: { $in: jobIds }
        });

        if (!application) {
            return res.status(404).json({ 
                success: false,
                error: "Application not found or unauthorized" 
            });
        }

        const result = await getDb().collection('applications').updateOne(
            { _id: new ObjectId(applicationId) },
            { $set: { status: 'hired', hiredAt: new Date() } }
        );

        if (result.modifiedCount === 0) {
            return res.status(400).json({ 
                success: false,
                error: "Failed to hire talent" 
            });
        }

        res.json({
            success: true,
            message: "Talent hired successfully"
        });
    } catch (error) {
        console.error("Error hiring talent:", error);
        res.status(500).json({ 
            success: false,
            error: "Failed to hire talent" 
        });
    }
};

module.exports = {
    getTalents,
    getHiredTalents,
    getTalentDetails,
    hireTalent
};