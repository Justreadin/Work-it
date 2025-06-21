const express = require("express");
const router = express.Router();
const { checkRole } = require("../middlewares/authMiddleware");
const {
    saveWorkerProfile,
    getWorkerProfile,
    uploadWorkerPhoto
} = require("../controllers/worker/profileController");
const { applyForJob } = require("../controllers/worker/jobController");
const upload = require("../config/multer");

router.use(checkRole(['worker']));

router.get("/profile", getWorkerProfile);
router.put("/profile", saveWorkerProfile);
router.post("/profile/photo", upload.single("image"), uploadWorkerPhoto);
router.post("/jobs/apply", applyForJob);

module.exports = router;