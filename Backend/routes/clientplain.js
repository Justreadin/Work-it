const express = require("express");
const router = express.Router();
const { checkRole } = require("../middlewares/authMiddleware");
const validateJob = require("../middlewares/validateJob");
const upload = require("../config/multer");

// Controllers
const {
    saveClientProfile,
    uploadClientPhoto,
    getClientProfile
} = require("../controllers/client/profileController");

// Support both gigController and jobController
const { createGig } = require("../controllers/client/gigController");
const { 
    createJob,
    getJobs,
    getJobDetails,
    updateJob,
    deleteJob,
    shuffleApplications,
    getJobApplications
} = require("../controllers/client/jobController");

const {
    getDashboardStats,
    getPaymentHistory
} = require("../controllers/client/dashboardController");

const {
    getTalents,
    getTalentDetails,
    hireTalent,
    getHiredTalents
} = require("../controllers/client/talentController");

const {
    makePayment,
    getPaymentDetails
} = require("../controllers/client/paymentController");

// Middleware for client routes
router.use(checkRole(['client']));

// Profile Routes
router.put("/profile", saveClientProfile);
router.get("/profile", getClientProfile);  // New
router.post("/profile/photo", upload.single('photo'), uploadClientPhoto);

// Job/Gig Routes (support both versions)
router.post("/gigs", createGig);  // Legacy endpoint
router.post("/jobs", validateJob.create, createJob);  // New endpoint

// New Job Management Routes
router.get("/jobs", getJobs);
router.get("/jobs/:id", getJobDetails);
router.put("/jobs/:id", validateJob.update, updateJob);
router.delete("/jobs/:id", deleteJob);
router.post("/jobs/:id/shuffle", shuffleApplications);
router.get("/jobs/:id/applications", getJobApplications);

// Dashboard Routes
router.get("/dashboard/stats", getDashboardStats);
router.get("/dashboard/payments", getPaymentHistory);

// Talent Routes
router.get("/talents", getTalents);
router.get("/talents/hired", getHiredTalents);
router.get("/talents/:id", getTalentDetails);
router.post("/talents/hire", hireTalent);

// Payment Routes
router.get("/payments/:id", getPaymentDetails);
router.post("/payments", makePayment);

module.exports = router;