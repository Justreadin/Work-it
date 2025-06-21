const { getDb } = require("../../config/db");
const db = getDb();

const saveClientProfile = async (req, res) => {
    const { userId } = req.user;
    const profileData = req.body;

    try {
        await db.collection('clients').updateOne(
            { userId },
            { $set: {
                    ...profileData,
                    updatedAt: new Date()
                }},
            { upsert: true }
        );

        res.json({ message: "Client profile saved" });
    } catch (error) {
        res.status(500).json({ error: "Failed to save profile" });
    }
};

module.exports = {
    saveClientProfile
};