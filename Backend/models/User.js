// models/User.js (Base Model)
const mongoose = require("mongoose");
const { cacheClient } = require("../config/db");

const educationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  schooling: {
    type: String,
    enum: ['Completed', 'Ongoing', 'Dropped'],
    required: true
  },
  schoolState: { type: String, required: true },
  schoolCountry: { type: String, required: true }
}, { _id: false });

const personalInfoSchema = new mongoose.Schema({
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
}, { _id: false });

const baseUserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format']
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  role: {
    type: String,
    required: true,
    enum: ['worker', 'client'],
    immutable: true
  },
  photo: {
    type: String
  },
  personalInformation: personalInfoSchema,
  otp: {
    type: String
  },
  otpCreatedAt: {
    type: Date
  },
  lastLogin: {
    type: Date
  }
}, {
  timestamps: true,
  discriminatorKey: 'role'
});

// Add indexes
baseUserSchema.index({ email: 1 });
baseUserSchema.index({ role: 1 });
baseUserSchema.index({ 'personalInformation.country': 1 });
baseUserSchema.index({ 'personalInformation.state': 1 });

// Pre-save hook for password hashing
baseUserSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      return next();
    } catch (err) {
      return next(err);
    }
  }
  return next();
});

// Method to compare passwords
baseUserSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Cache methods
baseUserSchema.methods.cacheUser = function() {
  const cacheKey = `user:${this.role}:${this.email}`;
  cacheClient.set(cacheKey, this.toObject(), 3600); // Cache for 1 hour
};

baseUserSchema.statics.getCachedUser = async function(email, role) {
  const cacheKey = `user:${role}:${email}`;
  const cachedUser = cacheClient.get(cacheKey);
  if (cachedUser) return cachedUser;
  return null;
};

const User = mongoose.model('User', baseUserSchema);

module.exports = User;