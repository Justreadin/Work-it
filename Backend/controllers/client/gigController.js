const { getDb } = require("../../config/db");
const db = getDb();

const createGig = async (req, res) => {
    const { userId } = req.user;
    const gigData = req.body;

    try {
        const result = await db.collection('jobs').insertOne({
            ...gigData,
            clientId: userId,
            createdAt: new Date(),
            status: 'open'
        });

        res.status(201).json({
            message: "Gig created",
            gigId: result.insertedId
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to create gig" });
    }
};

module.exports = {
    createGig
};