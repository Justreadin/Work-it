const express = require("express");
const router = express.Router();
const { checkRole, verifyToken } = require("../middlewares/authMiddleware");
const upload = require("../config/multer");
const { getDb } = require("../config/db");

const {
  saveWorkerProfile,
  getWorkerProfile,
  uploadWorkerPhoto,
  saveWorkerPersonalInformation,
  saveWorkerEducation,
  saveWorkerInterests,
  saveWorkerPersonalInformationData,
  saveWorkerEducationData,
  saveWorkerInterestsData,
  uploadProfilePhoto,
  uploadPhoto
} = require("../controllers/worker/profileController");

const { applyForJob } = require("../controllers/worker/jobController");

router.use(verifyToken);            
router.use(checkRole(['worker']));

/**
 * @swagger
 * tags:
 *   name: Worker
 *   description: Worker-related operations
 */

/**
 * @swagger
 * /api/worker/profile:
 *   get:
 *     summary: Get the authenticated worker's profile
 *     tags: [Worker]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Worker profile returned
 *       404:
 *         description: Profile not found
 */
router.get("/profile", getWorkerProfile);

/**
 * @swagger
 * /api/worker/profile:
 *   put:
 *     summary: Create or update a worker profile
 *     tags: [Worker]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *               bio:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile saved successfully
 *       500:
 *         description: Failed to save profile
 */
router.put("/profile", saveWorkerProfile);

/**
 * @swagger
 * /api/worker/profile/photo:
 *   post:
 *     summary: Upload a worker profile photo
 *     tags: [Worker]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Photo uploaded
 *       400:
 *         description: No file uploaded
 *       500:
 *         description: Upload failed
 */
router.post("/profile/photo", upload.single("image"), uploadWorkerPhoto);

/**
 * @swagger
 * /api/worker/jobs/apply:
 *   post:
 *     summary: Apply for a job
 *     tags: [Worker]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - jobId
 *             properties:
 *               jobId:
 *                 type: string
 *                 example: 6650e7d3a56a5b0021e5fa71
 *     responses:
 *       200:
 *         description: Application submitted
 *       404:
 *         description: Job not found
 *       500:
 *         description: Failed to apply
 */
router.post("/jobs/apply", applyForJob);

/**
 * @swagger
 * /api/worker/personalinformation:
 *   post:
 *     summary: Save worker personal information
 *     tags: [Worker]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Personal information saved
 *       500:
 *         description: Failed to save information
 */
router.post("/personalinformation", saveWorkerPersonalInformation);

/**
 * @swagger
 * /api/worker/education:
 *   post:
 *     summary: Save worker education details
 *     tags: [Worker]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               degree:
 *                 type: string
 *               institution:
 *                 type: string
 *               year:
 *                 type: string
 *     responses:
 *       200:
 *         description: Education details saved
 *       500:
 *         description: Failed to save education
 */
router.post("/education", saveWorkerEducation);

/**
 * @swagger
 * /api/worker/save-interests:
 *   post:
 *     summary: Save worker interests
 *     tags: [Worker]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               interests:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Interests saved
 *       500:
 *         description: Failed to save interests
 */
router.post("/save-interests", saveWorkerInterests);

/**
 * @swagger
 * /api/worker/upload-photo:
 *   post:
 *     summary: Upload an additional profile photo
 *     tags: [Worker]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Photo uploaded
 *       400:
 *         description: No file uploaded
 *       500:
 *         description: Upload failed
 */
router.post("/upload-photo", upload.single("image"), uploadPhoto);

/**
 * @swagger
 * /api/worker/personalize:
 *   post:
 *     summary: Complete worker profile in one step
 *     tags: [Worker]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               personal_information:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   location:
 *                     type: string
 *               education:
 *                 type: object
 *                 properties:
 *                   degree:
 *                     type: string
 *                   institution:
 *                     type: string
 *                   year:
 *                     type: string
 *               interest:
 *                 type: array
 *                 items:
 *                   type: string
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Profile completed successfully
 *       500:
 *         description: Failed to save profile
 */

router.post("/personalize", async (req, res) => {
  const db = getDb();
  try {
    const { personal_information, education, interest, skills } = req.body;
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (personal_information) {
      await saveWorkerPersonalInformationData(userId, personal_information);
    }

    if (education) {
      await saveWorkerEducationData(userId, education);
    }

    if (interest) {
      await saveWorkerInterestsData(userId, interest);
    }

    if (skills && Array.isArray(skills)) {
      await db.collection("workers").updateOne(
        { userId },
        { $set: { skills, updatedAt: new Date() } },
        { upsert: true }
      );
    }

    res.status(201).json({ message: "Profile completed successfully" });
  } catch (error) {
    console.error("Personalize error:", error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
