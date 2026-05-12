const nodemailer = require("nodemailer");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      email,
      name,
      amount,
      dueDate,
      type,
      emailType,
      paymentMethod,
      paidDate,
    } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.status(500).json({
        error: "Missing email environment variables",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const formattedAmount = Number(amount).toLocaleString("en-PH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    const isPaidEmail = emailType === "paid";

    const subject = isPaidEmail
      ? `Payment Receipt - ${type}`
      : `Billing Notice - ${type}`;

    const html = isPaidEmail
      ? `
        <div style="font-family: Arial, sans-serif; color: #1e2d47;">
          <h2>Payment Confirmed</h2>
          <p>Hello ${name},</p>
          <p>Your payment has been successfully recorded.</p>

          <div style="border: 1px solid #e2e8f4; border-radius: 8px; padding: 16px; margin: 16px 0;">
            <h3 style="margin-top: 0;">Payment Receipt</h3>
            <p><b>Bill Type:</b> ${type}</p>
            <p><b>Amount Paid:</b> ₱${formattedAmount}</p>
            <p><b>Payment Method:</b> ${paymentMethod || "Not specified"}</p>
            <p><b>Paid Date:</b> ${paidDate || new Date().toISOString().split("T")[0]}</p>
          </div>

          <p>Thank you for your payment.</p>
          <p>University of Batangas<br/>Payment Monitoring</p>
        </div>
      `
      : `
        <div style="font-family: Arial, sans-serif; color: #1e2d47;">
          <h2>Billing Reminder</h2>
          <p>Hello ${name},</p>
          <p>This is a billing reminder for your account.</p>

          <div style="border: 1px solid #e2e8f4; border-radius: 8px; padding: 16px; margin: 16px 0;">
            <p><b>Bill Type:</b> ${type}</p>
            <p><b>Amount Due:</b> ₱${formattedAmount}</p>
            <p><b>Due Date:</b> ${dueDate}</p>
          </div>

          <p>Please settle your payment on or before the due date.</p>
          <p>University of Batangas<br/>Payment Monitoring</p>
        </div>
      `;

    await transporter.sendMail({
      from: `"UB Payment Tracker" <${process.env.EMAIL_USER}>`,
      to: email,
      subject,
      html,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);

    return res.status(500).json({
      error: "Failed to send email",
      details: error.message,
      code: error.code,
      command: error.command,
    });
  }
};