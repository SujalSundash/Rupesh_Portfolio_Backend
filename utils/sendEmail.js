const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendOTPEmail = async (email, otp) => {
  try {
    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Verify Your Email",
      html: `
        <h2>Email Verification</h2>
        <p>Your OTP code is:</p>
        <h1 style="color:green;">${otp}</h1>
        <p>This code will expire in 5 minutes.</p>
      `,
    });

    console.log("Email sent:", data);
  } catch (error) {
    console.error(" Email error:", error);
    throw error;
  }
};

module.exports = sendOTPEmail;