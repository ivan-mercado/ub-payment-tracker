const BASE_URL = "http://localhost:5000";

// Generic request helper
const request = async (endpoint, options = {}) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      ...options,
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data.error || `Request failed: ${res.status}`);
    }

    return data;
  } catch (err) {
    if (err.name === "AbortError") {
      console.error("⏱ Request timeout:", endpoint);
      throw new Error("Request timed out");
    }

    console.error("❌ API error:", err.message);
    throw err;
  } finally {
    clearTimeout(timeout);
  }
};

// ✅ Send email (USED IN YOUR APP)
export const sendEmail = async (type, student, bill, paymentMethod = "") => {
  const response = await fetch(`${BASE_URL}/api/send-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: student.email,
      name: student.name,
      amount: bill.amount,
      dueDate: bill.dueDate,

      // this is the bill type: Tuition Fee, Misc Fee, etc.
      type: bill.type,

      // this is the email purpose: paid or overdue
      emailType: type,

      paymentMethod,
      paidDate: bill.paidDate,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to send email");
  }

  return response.json();
};

// (Optional) Health check for backend
export const checkServer = async () => {
  try {
    const res = await fetch(BASE_URL);
    const text = await res.text();
    console.log("🟢 Server response:", text);
    return true;
  } catch (err) {
    console.error("🔴 Backend not reachable");
    return false;
  }
};