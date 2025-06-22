const express = require("express");
const router = express.Router();
const { verifyToken, checkRole } = require("../middlewares/authMiddleware");
const validateJob = require("../middlewares/validateJob");
const upload = require("../config/multer");

// Controllers
const {
    saveClientProfile,
    uploadClientLogo,
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

router.use(verifyToken); 
router.use(checkRole(['client']));

/**
 * @swagger
 * tags:
 *   - name: Client
 *     description: Client-specific operations
 *   - name: Jobs
 *     description: Job management (new API)
 *   - name: Gigs
 *     description: Legacy gig management
 *   - name: Talent
 *     description: Talent management
 *   - name: Payments
 *     description: Payment processing
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     ClientProfile:
 *       type: object
 *       properties:
 *         companyName:
 *           type: string
 *           example: "Tech Solutions Inc."
 *         companySize:
 *           type: string
 *           enum: ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+']
 *           example: "51-200"
 *         industry:
 *           type: string
 *           example: "Information Technology"
 *         website:
 *           type: string
 *           example: "https://techsolutions.com"
 *         companyDescription:
 *           type: string
 *           example: "Leading tech provider..."
 *         hiringPreferences:
 *           type: array
 *           items:
 *             type: string
 *             enum: ['Full-time', 'Part-time', 'Contract', 'Freelance']
 *           example: ["Full-time", "Contract"]
 *         contactPerson:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: "John Doe"
 *             position:
 *               type: string
 *               example: "HR Manager"
 *             phone:
 *               type: string
 *               example: "+1234567890"
 *     Job:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: "LinkedIn Assistant"
 *         description:
 *           type: string
 *           example: "Need help managing LinkedIn messages"
 *         price:
 *           type: number
 *           example: 8000
 *         tasks:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Calling", "Email management"]
 *         duration:
 *           type: string
 *           enum: ['1 month', '3 months', '6 months']
 *           example: "3 months"
 *         workersNeeded:
 *           type: integer
 *           example: 1
 *     Talent:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "James Johnson"
 *         skills:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Communication", "Social Media"]
 *         applications:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Application'
 *     Application:
 *       type: object
 *       properties:
 *         jobTitle:
 *           type: string
 *           example: "LinkedIn Assistant"
 *         status:
 *           type: string
 *           enum: ['pending', 'shortlisted', 'hired', 'rejected']
 *           example: "pending"
 *         appliedAt:
 *           type: string
 *           format: date-time
 *     Payment:
 *       type: object
 *       properties:
 *         amount:
 *           type: number
 *           example: 8000
 *         paymentMethod:
 *           type: string
 *           example: "card"
 *         status:
 *           type: string
 *           enum: ['pending', 'completed', 'failed']
 *           example: "completed"
 */

// Profile Routes
/**
 * @swagger
 * /api/client/profile:
 *   put:
 *     summary: Update client profile
 *     tags: [Client]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClientProfile'
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/ClientProfile'
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.put("/profile", saveClientProfile);

/**
 * @swagger
 * /api/client/profile:
 *   get:
 *     summary: Get client profile
 *     tags: [Client]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Client profile data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/ClientProfile'
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Server error
 */
router.get("/profile", getClientProfile);

/**
 * @swagger
 * /api/client/profile/photo:
 *   post:
 *     summary: Upload client profile photo
 *     tags: [Client]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Photo uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     photoPath:
 *                       type: string
 *       400:
 *         description: No file uploaded
 *       500:
 *         description: Server error
 */
router.post("/profile/photo", upload.single('photo'), uploadClientLogo);

// Job/Gig Routes
/**
 * @swagger
 * /api/client/gigs:
 *   post:
 *     summary: "[Legacy] Create a new gig"
 *     description: "Deprecated endpoint - use /jobs instead"
 *     tags: [Gigs]
 *     deprecated: true
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Logo Design"
 *               description:
 *                 type: string
 *               budget:
 *                 type: number
 *                 example: 150
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Gig created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 gigId:
 *                   type: string
 *       500:
 *         description: Failed to create gig
 */
router.post("/gigs", createGig);

/**
 * @swagger
 * /api/client/jobs:
 *   post:
 *     summary: Create a new job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       201:
 *         description: Job created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Job'
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post("/jobs", validateJob.create, createJob);

/**
 * @swagger
 * /api/client/jobs:
 *   get:
 *     summary: Get all jobs for client
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Job'
 *       500:
 *         description: Server error
 */
router.get("/jobs", getJobs);

/**
 * @swagger
 * /api/client/jobs/{id}:
 *   get:
 *     summary: Get job details
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Job'
 *       404:
 *         description: Job not found
 *       500:
 *         description: Server error
 */
router.get("/jobs/:id", getJobDetails);

/**
 * @swagger
 * /api/client/jobs/{id}:
 *   put:
 *     summary: Update a job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       200:
 *         description: Job updated successfully
 *       404:
 *         description: Job not found
 *       500:
 *         description: Server error
 */
router.put("/jobs/:id", validateJob.update, updateJob);

/**
 * @swagger
 * /api/client/jobs/{id}:
 *   delete:
 *     summary: Delete a job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job deleted successfully
 *       404:
 *         description: Job not found
 *       500:
 *         description: Server error
 */
router.delete("/jobs/:id", deleteJob);

/**
 * @swagger
 * /api/client/jobs/{id}/shuffle:
 *   post:
 *     summary: Shuffle applications for a job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Applications shuffled
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Application'
 *       404:
 *         description: Job not found
 *       500:
 *         description: Server error
 */
router.post("/jobs/:id/shuffle", shuffleApplications);

/**
 * @swagger
 * /api/client/jobs/{id}/applications:
 *   get:
 *     summary: Get applications for a job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of applications
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Application'
 *       404:
 *         description: Job not found
 *       500:
 *         description: Server error
 */
router.get("/jobs/:id/applications", getJobApplications);

// Dashboard Routes
/**
 * @swagger
 * /api/client/dashboard/stats:
 *   get:
 *     summary: Get dashboard statistics
 *     tags: [Client]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     activeJobs:
 *                       type: integer
 *                     completedJobs:
 *                       type: integer
 *                     totalTalents:
 *                       type: integer
 *                     pendingApplications:
 *                       type: integer
 *                     recentJobs:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Job'
 *                     upcomingDeadlines:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Job'
 *       500:
 *         description: Server error
 */
router.get("/dashboard/stats", getDashboardStats);

/**
 * @swagger
 * /api/client/dashboard/payments:
 *   get:
 *     summary: Get payment history
 *     tags: [Client]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Payment history
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Payment'
 *       500:
 *         description: Server error
 */
router.get("/dashboard/payments", getPaymentHistory);

// Talent Routes
/**
 * @swagger
 * /api/client/talents:
 *   get:
 *     summary: Get all talents
 *     tags: [Talent]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of talents
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Talent'
 *       500:
 *         description: Server error
 */
router.get("/talents", getTalents);

/**
 * @swagger
 * /api/client/talents/hired:
 *   get:
 *     summary: Get hired talents
 *     tags: [Talent]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of hired talents
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Talent'
 *       500:
 *         description: Server error
 */
router.get("/talents/hired", getHiredTalents);

/**
 * @swagger
 * /api/client/talents/{id}:
 *   get:
 *     summary: Get talent details
 *     tags: [Talent]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Talent details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Talent'
 *       404:
 *         description: Talent not found
 *       500:
 *         description: Server error
 */
router.get("/talents/:id", getTalentDetails);

/**
 * @swagger
 * /api/client/talents/hire:
 *   post:
 *     summary: Hire a talent
 *     tags: [Talent]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               applicationId:
 *                 type: string
 *                 description: ID of the application to hire
 *     responses:
 *       200:
 *         description: Talent hired successfully
 *       404:
 *         description: Application not found
 *       500:
 *         description: Server error
 */
router.post("/talents/hire", hireTalent);

// Payment Routes
/**
 * @swagger
 * /api/client/payments/{id}:
 *   get:
 *     summary: Get payment details
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Payment'
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Server error
 */
router.get("/payments/:id", getPaymentDetails);

/**
 * @swagger
 * /api/client/payments:
 *   post:
 *     summary: Make a payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               jobId:
 *                 type: string
 *               talentId:
 *                 type: string
 *               paymentMethod:
 *                 type: string
 *                 enum: ['card', 'bank_transfer', 'wallet']
 *     responses:
 *       201:
 *         description: Payment successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Payment'
 *       400:
 *         description: Invalid payment data
 *       500:
 *         description: Payment failed
 */
router.post("/payments", makePayment);

module.exports = router;