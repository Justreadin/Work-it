const { getDb } = require("../../config/db");
const { ObjectId } = require("mongodb");

// Make a payment
const makePayment = async (req, res) => {
    try {
        const { amount, jobId, talentId, paymentMethod } = req.body;
        
        // Basic validation
        if (!amount || !jobId || !talentId || !paymentMethod) {
            return res.status(400).json({ 
                success: false,
                error: "Missing required fields" 
            });
        }

        // Verify job belongs to client
        const job = await getDb().collection('jobs').findOne({
            _id: new ObjectId(jobId),
            clientId: new ObjectId(req.user.userId)
        });

        if (!job) {
            return res.status(404).json({ 
                success: false,
                error: "Job not found or unauthorized" 
            });
        }

        // Verify talent was hired for this job
        const application = await getDb().collection('applications').findOne({
            jobId: new ObjectId(jobId),
            workerId: new ObjectId(talentId),
            status: 'hired'
        });

        if (!application) {
            return res.status(404).json({ 
                success: false,
                error: "Talent not hired for this job" 
            });
        }

        // Create payment record
        const paymentData = {
            clientId: new ObjectId(req.user.userId),
            talentId: new ObjectId(talentId),
            jobId: new ObjectId(jobId),
            amount,
            paymentMethod,
            status: 'completed',
            date: new Date(),
            createdAt: new Date()
        };

        const result = await getDb().collection('payments').insertOne(paymentData);

        res.status(201).json({
            success: true,
            data: {
                ...paymentData,
                _id: result.insertedId
            }
        });
    } catch (error) {
        console.error("Payment error:", error);
        res.status(500).json({ 
            success: false,
            error: "Payment failed" 
        });
    }
};

// Get payment details
const getPaymentDetails = async (req, res) => {
    try {
        const payment = await getDb().collection('payments').findOne({
            _id: new ObjectId(req.params.id),
            clientId: new ObjectId(req.user.userId)
        });

        if (!payment) {
            return res.status(404).json({ 
                success: false,
                error: "Payment not found" 
            });
        }

        res.json({
            success: true,
            data: payment
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: "Failed to fetch payment details" 
        });
    }
};

module.exports = {
    makePayment,
    getPaymentDetails
};