const { getDb } = require("../../config/db");
const { ObjectId } = require("mongodb");

// Get dashboard statistics
const getDashboardStats = async (req, res) => {
    try {
        const clientId = req.user.userId;
        
        // First get all job IDs for the client
        const jobIds = await getDb().collection('jobs')
            .find({ clientId: new ObjectId(clientId) })
            .project({ _id: 1 }) // Only fetch IDs to avoid circular references
            .map(job => job._id)
            .toArray();

        const [
            activeJobsCount,
            completedJobsCount,
            totalTalents,
            pendingApplications,
            recentJobs,
            upcomingDeadlines
        ] = await Promise.all([
            // Active jobs count
            getDb().collection('jobs').countDocuments({ 
                _id: { $in: jobIds },
                status: 'active'
            }),
            
            // Completed jobs count
            getDb().collection('jobs').countDocuments({ 
                _id: { $in: jobIds },
                status: 'completed'
            }),
            
            // Total hired talents
            getDb().collection('applications').countDocuments({
                status: 'hired',
                jobId: { $in: jobIds }
            }),
            
            // Pending applications
            getDb().collection('applications').countDocuments({
                status: 'pending',
                jobId: { $in: jobIds }
            }),
            
            // Recent jobs (last 5)
            getDb().collection('jobs')
                .find({ _id: { $in: jobIds } })
                .sort({ createdAt: -1 })
                .limit(5)
                .project({
                    title: 1,
                    status: 1,
                    createdAt: 1,
                    deadline: 1,
                    applications: { $size: "$applications" }
                })
                .toArray(),
            
            // Upcoming deadlines (next 7 days)
            getDb().collection('jobs')
                .find({ 
                    _id: { $in: jobIds },
                    deadline: { 
                        $gte: new Date(),
                        $lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                    },
                    status: 'active'
                })
                .sort({ deadline: 1 })
                .project({
                    title: 1,
                    status: 1,
                    deadline: 1
                })
                .toArray()
        ]);

        res.json({
            success: true,
            data: {
                counts: {
                    activeJobs: activeJobsCount,
                    completedJobs: completedJobsCount,
                    totalTalents,
                    pendingApplications
                },
                recentJobs,
                upcomingDeadlines
            }
        });
    } catch (error) {
        console.error("Dashboard error:", error);
        res.status(500).json({ 
            success: false,
            error: "Failed to load dashboard data",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Get payment history
const getPaymentHistory = async (req, res) => {
    try {
        const payments = await getDb().collection('payments')
            .find({ clientId: new ObjectId(req.user.userId) })
            .sort({ date: -1 })
            .project({
                amount: 1,
                date: 1,
                status: 1,
                paymentMethod: 1
            })
            .toArray();

        res.json({
            success: true,
            data: payments
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: "Failed to fetch payment history" 
        });
    }
};

module.exports = {
    getDashboardStats,
    getPaymentHistory
};