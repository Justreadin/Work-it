const Queue = require('bull');
const nodemailer = require('nodemailer');
const { sendOtp } = require('./userController');

// Create a new queue for OTPs
const otpQueue = new Queue('otpQueue', 'redis://127.0.0.1:6379'); // Assuming Redis as the queue backend

// Processor for the OTP queue
otpQueue.process(async (job) => {
  try {
    // Generate and send OTP to the user's email
    const otp = await sendOtp(job.data.email);
    console.log(`OTP sent to ${job.data.email}: ${otp}`);
  } catch (error) {
    console.error(`Error processing OTP for ${job.data.email}:`, error);
    throw error;
  }
});

// Add a job to the OTP queue (triggered when OTP is requested)
const addOtpJob = async (email) => {
  await otpQueue.add({ email }); // Add the email to the queue for OTP generation and sending
};

module.exports = { addOtpJob };
