const { getDb } = require("../../config/db");

const saveWorkerProfile = async (req, res) => {
     const db = getDb();
    const { userId } = req.user;
    const profileData = req.body;

    try {
        await db.collection('workers').updateOne(
            { userId },
            { $set: { ...profileData, updatedAt: new Date() }},
            { upsert: true }
        );
        res.json({ success: true, message: "Profile saved successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to save profile" });
    }
};

const getWorkerProfile = async (req, res) => {
     const db = getDb();
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
     const db = getDb();
    const { userId } = req.user;
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

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

const saveWorkerPersonalInformationData = async (userId, data) => {
    const db = getDb();
    const { name, phone, location } = data;
    if (!name || !phone || !location) {
        throw new Error("All fields are required");
    }

    await db.collection('workers').updateOne(
        { userId },
        { $set: { name, phone, location } }
    );
};

const saveWorkerEducationData = async (userId, data) => {
    const db = getDb();
    const { degree, institution, year } = data;
    if (!degree || !institution || !year) {
        throw new Error("All fields are required");
    }

    await db.collection('workers').updateOne(
        { userId },
        { $set: { education: data } }
    );
};

const saveWorkerInterestsData = async (userId, interests) => {
    const db = getDb();
    if (!Array.isArray(interests)) {
        throw new Error("Interests must be an array");
    }

    await db.collection('workers').updateOne(
        { userId },
        { $set: { interests } }
    );
};

// --- Route Wrappers (still usable as individual endpoints) ---

const saveWorkerPersonalInformation = async (req, res) => {
    const { userId } = req.user;
    try {
        await saveWorkerPersonalInformationData(userId, req.body);
        res.status(200).json({ message: "Personal information saved" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const saveWorkerEducation = async (req, res) => {
    const { userId } = req.user;
    try {
        await saveWorkerEducationData(userId, req.body);
        res.status(200).json({ message: "Education saved" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const saveWorkerInterests = async (req, res) => {
    const { userId } = req.user;
    try {
        await saveWorkerInterestsData(userId, req.body.interests);
        res.status(200).json({ message: "Interests saved" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const uploadPhoto = async (req, res) => {
const db = getDb();
  const { userId } = req.user;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const photoPath = `/uploads/${file.filename}`;
    await db.collection('workers').updateOne(
      { userId },
      { $set: { additionalPhoto: photoPath } }
    );
    res.status(200).json({ message: "Photo uploaded", photoPath });
  } catch (error) {
    console.error("Upload Photo Error:", error); // Add this line
    res.status(500).json({ error: "Failed to upload photo" });
  }
};

module.exports = {
    saveWorkerProfile,
    getWorkerProfile,
    uploadWorkerPhoto,
    saveWorkerPersonalInformation,
    saveWorkerEducation,
    saveWorkerInterests,
    saveWorkerPersonalInformationData,
    saveWorkerEducationData,
    saveWorkerInterestsData,
    uploadPhoto
};
