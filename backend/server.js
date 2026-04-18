const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Resend } = require("resend");

dotenv.config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"]
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.post("/send-email", async (req, res) => {
  try {
    const { type, student, bill } = req.body;

    if (!type || !student || !bill) {
      return res.status(400).json({
        success: false,
        error: "Missing required data",
      });
    }

    let subject = "";
    let html = "";

    if (type === "overdue") {
      subject = `⚠️ Overdue Notice – ${bill.type}`;
      html = `
        <h2>Overdue Payment Notice</h2>
        <p>Dear ${student.name},</p>
        <p>Your <b>${bill.type}</b> of <b>₱${bill.amount.toLocaleString()}</b>
        was due on <b>${new Date(bill.dueDate).toLocaleDateString("en-PH")}</b>.</p>
        <p>Please settle your balance immediately.</p>
      `;
    }

    if (type === "paid") {
      subject = `✅ Payment Confirmed – ${bill.type}`;
      html = `
        <h2>Payment Confirmed</h2>
        <p>Dear ${student.name},</p>
        <p>We received your payment of <b>₱${bill.amount.toLocaleString()}</b>.</p>
        <p>Reference: ${bill.id}</p>
      `;
    }

    const data = await resend.emails.send({
      from: "UB Payments <onboarding@resend.dev>",
      to: student.email,
      subject,
      html,
    });

    return res.status(200).json({ success: true, data });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});