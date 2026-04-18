const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// =======================
// EMAIL TRANSPORTER
// =======================
// Use Gmail SMTP (you must enable App Passwords)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "Mail",
    pass: "bkqp entc ykpc teak",
  },
});

// =======================
// SEND EMAIL ENDPOINT
// =======================
app.post("/api/send-email", async (req, res) => {
  try {
    const { email, name, amount, dueDate, type } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const mailOptions = {
      from: "Your School Billing System <YOUR_EMAIL@gmail.com>",
      to: email,
      subject: `Billing Notice: ${type}`,
      html: `
        <div style="font-family: Arial; padding: 20px;">
          <h2>Hello ${name},</h2>

          <p>This is a billing reminder from the system.</p>

          <table style="border-collapse: collapse;">
            <tr>
              <td><b>Type:</b></td>
              <td>${type}</td>
            </tr>
            <tr>
              <td><b>Amount:</b></td>
              <td>₱${amount}</td>
            </tr>
            <tr>
              <td><b>Due Date:</b></td>
              <td>${dueDate}</td>
            </tr>
          </table>

          <p style="margin-top: 20px;">
            Please settle your payment before the due date.
          </p>

          <p>Thank you.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

// =======================
// START SERVER
// =======================
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});