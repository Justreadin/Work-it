const express = require("express");
const router = express.Router();
const { checkRole } = require("../middlewares/authMiddleware");
const {
    saveClientProfile
} = require("../controllers/client/profileController");
const { createGig } = require("../controllers/client/gigController");

router.use(checkRole(['client']));

router.put("/profile", saveClientProfile);
router.post("/gigs", createGig);

module.exports = router;