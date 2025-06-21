const express = require("express");
const { 
  loginUser, 
  registerUser, 
  savePersonalInformation, 
  saveEducationForm,
  sendOtp, verifyOtp,
  uploadProfilePhoto, uploadPhoto,
  saveInterests
} = require("../controllers/userController");
const router = express.Router();

// POST /api/login
router.post("/login", loginUser);

// POST /api/signup
router.post("/signup", registerUser);

// POST /api/personalinformation
router.post("/personalinformation", savePersonalInformation);

// POST /api/educationform
router.post("/education", saveEducationForm);

// Route to save user interests
router.post('/save-interests', saveInterests);

// Route to send OTP
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  try {
    await sendOtp(email);
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending OTP' });
  }
});

// Route to verify OTP
router.post('/verify-otp', async (req, res) => {
  const { email, otpEntered } = req.body;
  const isVerified = await verifyOtp(email, otpEntered);

  if (isVerified) {
    res.status(200).json({ message: 'OTP verified successfully' });
  } else {
    res.status(400).json({ message: 'Invalid OTP' });
  }
});

// Route to upload profile photo
router.post('/upload-photo', uploadProfilePhoto, uploadPhoto);

// Add to api.js
router.post('/personalize', async (req, res) => {
  try {
    const { personal_information, education, interest, skills } = req.body;
    // Validate and save all data
    res.status(201).json({ message: "Profile completed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save profile" });
  }
});

module.exports = router;
