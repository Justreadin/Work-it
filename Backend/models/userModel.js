const { pool } = require("../config/db");

// Fetch user by email
const getUserByEmail = async (email) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
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
    return { id: result.insertId, email };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const savePersonalInformation = async (
  email, // Add email parameter
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


// Save OTP to the database
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

// Get OTP from the database
const getOtp = async (email) => {
  try {
    const [rows] = await pool.query("SELECT otp FROM user_otp WHERE email = ? ORDER BY created_at DESC LIMIT 1", [email]);
    return rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Save uploaded photo file path to the database
const saveUserPhoto = async (userId, photoPath) => {
  try {
    const [result] = await pool.query(
      "UPDATE users SET photo = ? WHERE id = ?",
      [photoPath, userId]
    );
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
// Save user interests to the database
const saveUserInterests = async (userId, interests) => {
  try {
    const [result] = await pool.query(
      "UPDATE users SET interests = ? WHERE id = ?",
      [JSON.stringify(interests), userId]  // Store interests as a JSON string
    );
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = { getUserByEmail, createUser, savePersonalInformation,
     saveEducationForm, saveOtp, getOtp, saveUserPhoto, saveUserInterests 
     };
