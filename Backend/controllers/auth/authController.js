const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { getDb } = require("../../config/db");


const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";
const otpCache = {};

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Common auth functions
const loginUser = async (req, res) => {
    const db = getDb();
    const { email, password } = req.body;

    try {
        const user = await db.collection('users').findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found" });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ message: "Login successful", token, role: user.role });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

const registerUser = async (req, res) => {
    const db = getDb();
    const { email, password, confirmPassword, role } = req.body;

    try {
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }

        const existingUser = await db.collection('users').findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            email,
            password: hashedPassword,
            role,
            createdAt: new Date()
        };

        const result = await db.collection('users').insertOne(newUser);

        // Create role-specific profile
        if (role === 'worker') {
            await db.collection('workers').insertOne({
                userId: result.insertedId,
                email,
                createdAt: new Date()
            });
        } else if (role === 'client') {
            await db.collection('clients').insertOne({
                userId: result.insertedId,
                email,
                createdAt: new Date()
            });
        }

        const token = jwt.sign(
            { id: result.insertedId, email, role },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(201).json({ message: "User registered", token, role });
    } catch (error) {
        res.status(500).json({ error: "Registration failed" });
    }
};

const sendOtp = async (email) => {
  const db = getDb();
  const otp = crypto.randomInt(1000, 9999).toString();
  otpCache[email] = { otp, expiresAt: Date.now() + 300000 };

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Verification Code",
    text: `Your verification code is: ${otp}`,
  };

  return transporter.sendMail(mailOptions); // ✅ return so you can await it
};

const verifyOtp = async (email, otp) => {
    
    const cached = otpCache[email];
    if (cached && cached.expiresAt > Date.now() && cached.otp === otp) {
        delete otpCache[email];
        return true;
    }
    return false;
};

module.exports = {
    loginUser,
    registerUser,
    sendOtp,
    verifyOtp
};