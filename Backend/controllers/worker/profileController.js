const { getDb } = require("../../config/db");
const db = getDb();

const saveWorkerProfile = async (req, res) => {
    const { userId } = req.user;
    const profileData = req.body;

    try {
        const updateResult = await db.collection('workers').updateOne(
            { userId },
            { $set: {
                    ...profileData,
                    updatedAt: new Date()
                }},
            { upsert: true }
        );

        res.json({
            success: true,
            message: "Profile saved successfully"
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to save profile" });
    }
};

const getWorkerProfile = async (req, res) => {
    const { userId } = req.user;

    try {
        const profile = await db.collection('workers').findOne({ userId });
        if (!profile) return res.status(404).json({ error: "Profile not found" });

        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch profile" });
    }
};

const uploadWorkerPhoto = async (req, res) => {
    const { userId } = req.user;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    try {
        const photoPath = `/uploads/${file.filename}`;
        await db.collection('workers').updateOne(
            { userId },
            { $set: { photo: photoPath } }
        );

        res.json({ photoPath });
    } catch (error) {
        res.status(500).json({ error: "Failed to upload photo" });
    }
};

module.exports = {
    saveWorkerProfile,
    getWorkerProfile,
    uploadWorkerPhoto
};