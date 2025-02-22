const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto"); // To generate random OTP
const path = require("path");
const multer = require("multer");
const nodemailer = require("nodemailer"); // <-- Added nodemailer
const { savePersonalInformation } = require("../models/userModel");

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalname);
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

const {
  getUserByEmail,
  createUser,
  savePersonalInfo, // Renamed to avoid conflict
  saveEducationForm, // Renamed to avoid conflict
  saveOtp,
  getOtp,
  saveUserPhoto,
  saveUserInterests,
} = require("../models/userModel");

// Environment variables
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// Create a transporter using Nodemailer (using Gmail as example)
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email address (e.g. your-email@gmail.com)
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  },
});

// Login controller
const loginUser = async (req, res) => {
  const { mail, password } = req.body;

  try {
    if (!mail || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await getUserByEmail(mail);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Register user
const registerUser = async (req, res) => {
  const { mail, password, confirmPassword } = req.body;

  try {
    if (!mail || !password || !confirmPassword) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const existingUser = await getUserByEmail(mail);
    if (existingUser) {
      return res.status(409).json({ error: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(mail, hashedPassword);

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
const savePersonalInformationHandler = async (req, res) => {
  const {
    email, // Extract email from request body
    firstname,
    surname,
    number,
    country,
    city,
    dateOfBirth,
    gender,
    address,
    state,
    localGovernment,
  } = req.body;

  try {
    if (!email || !firstname || !surname || !number || !country || !city || !dateOfBirth || !gender || !address || !state || !localGovernment) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const result = await savePersonalInformation(
      email,
      firstname,
      surname,
      number,
      country,
      city,
      dateOfBirth,
      gender,
      address,
      state,
      localGovernment
    );

    res.status(201).json({ message: "Personal information saved successfully", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save personal information" });
  }
};


// Save education form
const saveEducationFormHandler = async (req, res) => {
  const { degree, institution, startDate, endDate, schooling, schoolState, schoolCountry } = req.body;

  try {
    if (!degree || !institution || !startDate || !endDate || schoolState === "" || schoolCountry === "") {
      return res.status(400).json({ error: "All fields are required" });
    }

    const result = await saveEducationForm(degree, institution, startDate, endDate, schooling, schoolState, schoolCountry);
    res.status(201).json({ message: "Education form saved successfully", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save education form" });
  }
};


// Generate OTP and send it to the user's email
const sendOtp = async (email) => {
  const otp = crypto.randomInt(1000, 9999).toString(); // Generate a 4-digit OTP
  await saveOtp(email, otp);

  // Configure the email options
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to: email, // Recipient's email address
    subject: "Your Verification Code",
    text: `Your verification code is: ${otp}`,
  };

  // Send the email using the transporter
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log(`OTP sent to ${email}: ${otp}`);
    }
  });
};

// Verify the OTP entered by the user
const verifyOtp = async (email, otpEntered) => {
  const otpRecord = await getOtp(email);

  if (otpRecord && otpRecord.otp === otpEntered) {
    console.log("OTP Verified");
    return true;
  } else {
    console.log("Invalid OTP");
    return false;
  }
};

// Upload profile photo
const uploadPhoto = async (req, res) => {
  const { userId } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const photoPath = `/uploads/${file.filename}`;
    await saveUserPhoto(userId, photoPath);
    res
      .status(200)
      .json({ message: "Photo uploaded successfully", photoPath });
  } catch (error) {
    res.status(500).json({ message: "Error uploading photo", error });
  }
};

// Save the interests provided by the user
const saveInterests = async (req, res) => {
  const { userId, interests } = req.body;

  if (!userId || !interests) {
    return res
      .status(400)
      .json({ message: "User ID and interests are required" });
  }

  try {
    await saveUserInterests(userId, interests);
    res.status(200).json({ message: "Interests saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving interests", error });
  }
};

module.exports = {
  loginUser,
  registerUser,
  savePersonalInformation: savePersonalInformationHandler,
  saveEducationForm: saveEducationFormHandler,
  sendOtp,
  verifyOtp,
  uploadPhoto,
  uploadProfilePhoto: upload.single("image"),
  saveInterests,
};
