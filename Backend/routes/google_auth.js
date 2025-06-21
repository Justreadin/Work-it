const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { pool } = require("../db"); // Assuming a db.js file for MySQL pool connection
const router = express.Router();

// Environment variables
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// ------------------------------
// Passport Google OAuth Setup
// ------------------------------
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID, // from your .env file
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, // from your .env file
            callbackURL: "http://localhost:5600/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Extract the user's email from the profile (ensure the Google strategy scopes include "email")
                const email = profile.emails[0].value;
                // Check if the user already exists in the database
                const [existingUser] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
                if (existingUser.length > 0) {
                    // User exists – return the user record
                    return done(null, existingUser[0]);
                } else {
                    // If the user doesn't exist, create a new user.
                    // You might want to generate a default password (or null) as Google handles authentication.
                    const defaultPassword = ""; // or generate a random string if required
                    const [result] = await pool.query(
                        "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
                        [email, defaultPassword, "user"]
                    );
                    // Retrieve the newly created user record
                    const [newUser] = await pool.query("SELECT * FROM users WHERE id = ?", [result.insertId]);
                    return done(null, newUser[0]);
                }
            } catch (err) {
                return done(err);
            }
        }
    )
);

// Serialize the user for session storage
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize the user from the session
passport.deserializeUser(async (id, done) => {
    try {
        const [user] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
        if (user.length > 0) {
            done(null, user[0]);
        } else {
            done(new Error("User not found"));
        }
    } catch (err) {
        done(err);
    }
});

// ------------------------------
// Google OAuth Routes
// ------------------------------

// Route to initiate Google OAuth
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Callback route that Google redirects to after authentication
router.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
        // Successful authentication: generate a JWT for the user
        const user = req.user;
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.redirect(`http://localhost:5173?token=${token}`);
    }
);


module.exports = router;
