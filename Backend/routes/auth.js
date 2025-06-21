const express = require("express");
const router = express.Router();
const {
    loginUser,
    registerUser,
    sendOtp,
    verifyOtp
} = require("../controllers/auth/authController");

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

module.exports = router;