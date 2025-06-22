const { getDb } = require("../../config/db");
const { ObjectId } = require("mongodb");

const createGig = async (req, res) => {
    const { userId } = req.user;
    const gigData = req.body;

    try {
        // Transform gig data to match job schema
        const jobData = {
            title: gigData.title,
            description: gigData.description,
            price: gigData.budget,
            category: gigData.category,
            clientId: new ObjectId(userId),
            status: 'open',
            createdAt: new Date(),
            updatedAt: new Date(),
            applications: []
        };

        const result = await getDb().collection('jobs').insertOne(jobData);

        // Return response in legacy format
        res.status(201).json({
            message: "Gig created",
            gigId: result.insertedId
        });
    } catch (error) {
        res.status(500).json({ 
            error: "Failed to create gig",
            ...(process.env.NODE_ENV === 'development' && { details: error.message })
        });
    }
};

module.exports = {
    createGig
};