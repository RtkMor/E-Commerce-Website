const nodemailer = require('nodemailer');
const otpModel = require('../../models/otpModel');
const otpGenerator = require('otp-generator');

async function sendOtpController(req, res) {
  try {
    const { email } = req.body;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email address!",
        error: true,
        success: false,
      });
    }

    // Generate OTP
    const otp = otpGenerator.generate(6, { digits: true });

    // Save OTP to the database
    await otpModel.create({ email, otp });

    // Set up nodemailer transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'sydnee37@ethereal.email',
        pass: '7CBkBNAzxrMeUD9X8k'
      }
    });

    const mailOptions = {
      from: '"Mor E-Commerce Website" <mor@e-commerce.com>',
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}`
    };

    
    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    // Details ->
    console.log("email -> ", email);

    // Preview URL
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.status(200).json({
      message: "OTP sent to your email!",
      success: true,
      error: false,
      previewUrl: nodemailer.getTestMessageUrl(info) // Add this line to provide preview URL
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server problem!",
      error: true,
      success: false,
    });
  }
}

module.exports = sendOtpController;