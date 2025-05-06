/**const { pool } = require("../config/db");
const redisClient = require("../config/redis");

// Fetch user by email with Redis caching
const getUserByEmail = async (email) => {
  const cacheKey = `user:email:${email}`;

  try {
    const cachedUser = await redisClient.get(cacheKey);
    if (cachedUser) return JSON.parse(cachedUser);

    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    const user = rows[0];

    if (user) {
      await redisClient.setEx(cacheKey, 3600, JSON.stringify(user)); // cache for 1 hour
    }

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Create a new user
const createUser = async (email, hashedPassword) => {
  try {
    const [result] = await pool.query(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, hashedPassword]
    );

    // Optional: Set the cache after creation
    const newUser = { id: result.insertId, email };
    const cacheKey = `user:email:${email}`;
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(newUser));

    return newUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const savePersonalInformation = async (
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
) => {
  try {
    const [result] = await pool.query(
      "INSERT INTO personal_information (email, firstname, surname, number, country, city, dateOfBirth, gender, address, state, localGovernment) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [email, firstname, surname, number, country, city, dateOfBirth, gender, address, state, localGovernment]
    );

    // Invalidate user cache
    await redisClient.del(`user:email:${email}`);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const saveEducationForm = async (degree, institution, startDate, endDate, schooling, schoolState, schoolCountry) => {
  try {
    const [result] = await pool.query(
      "INSERT INTO education_form (degree, institution, startDate, endDate, schooling, schoolState, schoolCountry) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [degree, institution, startDate, endDate, schooling, schoolState, schoolCountry]
    );
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const saveOtp = async (email, otp) => {
  try {
    const [result] = await pool.query(
      "INSERT INTO user_otp (email, otp, created_at) VALUES (?, ?, NOW())",
      [email, otp]
    );
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getOtp = async (email) => {
  try {
    const [rows] = await pool.query(
      "SELECT otp FROM user_otp WHERE email = ? ORDER BY created_at DESC LIMIT 1",
      [email]
    );
    return rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const saveUserPhoto = async (userId, photoPath) => {
  try {
    const [result] = await pool.query(
      "UPDATE users SET photo = ? WHERE id = ?",
      [photoPath, userId]
    );

    // Invalidate all possible user cache keys
    await redisClient.del(`user:id:${userId}`);

    // Optional: if email is available (recommended to fetch and delete via email too)
    // const user = await getUserById(userId);
    // if (user?.email) await redisClient.del(`user:email:${user.email}`);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const saveUserInterests = async (userId, interests) => {
  try {
    const [result] = await pool.query(
      "UPDATE users SET interests = ? WHERE id = ?",
      [JSON.stringify(interests), userId]
    );

    await redisClient.del(`user:id:${userId}`);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  getUserByEmail,
  createUser,
  savePersonalInformation,
  saveEducationForm,
  saveOtp,
  getOtp,
  saveUserPhoto,
  saveUserInterests,
};
*/

const mongoose = require("mongoose");
const redisClient = require("../config/redis");


const educationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  schooling: { type: String, enum: ['Completed', 'Ongoing', 'Dropped'], required: true },
  schoolState: { type: String, required: true },
  schoolCountry: { type: String, required: true }
});

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  photo: { type: String }, // optional, for user photo
  interests: { type: [String], default: [] }, // stores user interests as an array of strings
  personalInformation: {
    firstname: String,
    surname: String,
    number: String,
    country: String,
    city: String,
    dateOfBirth: Date,
    gender: String,
    address: String,
    state: String,
    localGovernment: String,
  },
  education: [educationSchema],
  otp: { type: String }, // stores OTP if needed
  otpCreatedAt: { type: Date }, // timestamp for OTP expiry check
});

const User = mongoose.model("User", userSchema);

const getUserByEmail = async (email) => {
  const cacheKey = `user:email:${email}`;

  try {
    // Check if the user is cached
    const cachedUser = await redisClient.get(cacheKey);
    if (cachedUser) {
      return JSON.parse(cachedUser);
    }

    // If not cached, fetch from the database
    const user = await User.findOne({ email });
    if (user) {
      // Cache the user data for 1 hour (3600 seconds)
      await redisClient.set(cacheKey, JSON.stringify(user), 'EX', 3600);  // Corrected Redis call
    }

    return user;
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw error;
  }
};

// Create a new user
const createUser = async (email, hashedPassword) => {
  try {
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    // Optionally, set the cache after creation
    const cacheKey = `user:email:${email}`;
    await redisClient.set(cacheKey, JSON.stringify(newUser), 'EX', 3600);  // Corrected Redis call

    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};



// Save personal information to the user document
const savePersonalInformation = async (
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
) => {
  try {
    const user = await User.findOneAndUpdate(
      { email },
      {
        personalInformation: {
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
        },
      },
      { new: true }
    );

    // Invalidate user cache
    await redisClient.del(`user:email:${email}`);

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Save Education Form (educationDetails must match the educationSchema)
const saveEducationForm = async (email, educationDetails) => {
  try {
    const user = await User.findOneAndUpdate(
      { email },
      { $push: { education: educationDetails } },
      { new: true }
    );

    await redisClient.del(`user:email:${email}`);
    return user;
  } catch (error) {
    console.error("Error saving education:", error);
    throw error;
  }
};


// Save OTP for the user
const saveOtp = async (email, otp) => {
  try {
    const user = await User.findOneAndUpdate(
      { email },
      { otp, otpCreatedAt: new Date() },
      { new: true }
    );
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Get OTP for the user
const getOtp = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user ? user.otp : null;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Save user photo (path)
const saveUserPhoto = async (email, photoPath) => {
  try {
    const user = await User.findOneAndUpdate(
      { email },
      { photo: photoPath },
      { new: true }
    );

    // Invalidate user cache
    await redisClient.del(`user:email:${email}`);

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Save user interests
const saveUserInterests = async (email, interests) => {
  try {
    const user = await User.findOneAndUpdate(
      { email },
      { interests },
      { new: true }
    );

    await redisClient.del(`user:email:${email}`);
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  getUserByEmail,
  createUser,
  savePersonalInformation,
  saveEducationForm,
  saveOtp,
  getOtp,
  saveUserPhoto,
  saveUserInterests,
};
