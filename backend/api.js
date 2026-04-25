require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✅ Gmail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // app password
  },
});

app.post("/api/send-email", async (req, res) => {
  try {
    const { email, name, amount, dueDate, type } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    await transporter.sendMail({
      from: `"UB Payment Tracker" <${process.env.EMAIL_USER}>`,
      to: email, // ✅ FULLY DYNAMIC NOW
      subject: `Billing Notice: ${type}`,
      html: `
        <h2>Hello ${name},</h2>
        <p>This is a billing reminder.</p>
        <p><b>Type:</b> ${type}</p>
        <p><b>Amount:</b> ₱${amount}</p>
        <p><b>Due Date:</b> ${dueDate}</p>
        <p>Please settle your payment.</p>
      `,
    });

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});