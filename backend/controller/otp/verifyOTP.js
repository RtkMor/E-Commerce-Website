const otpModel = require('../../models/otpModel');

async function verifyOtpController(req, res) {
  try {
    const { email, otp } = req.body;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email address!",
        error: true,
        success: false,
      });
    }

    // Validate OTP
    const otpRecord = await otpModel.findOne({ email, otp });
    if (!otpRecord) {
      return res.status(400).json({
        message: "Invalid OTP!",
        error: true,
        success: false,
      });
    }

    // OTP is valid
    res.status(200).json({
      message: "OTP verified successfully!",
      success: true,
      error: false,
    });

    // Delete the OTP record after verification
    await otpModel.deleteOne({ email, otp });

  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server problem!",
      error: true,
      success: false,
    });
  }
}

module.exports = verifyOtpController;