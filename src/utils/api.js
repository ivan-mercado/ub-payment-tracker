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
export const sendEmail = async (type, student, bill) => {
  if (!type || !student || !bill) {
    throw new Error("Missing required email data");
  }

  try {
    console.log("📤 Sending email:", { type, student, bill });

    const data = await request("/send-email", {
      method: "POST",
      body: JSON.stringify({ type, student, bill }),
    });

    console.log("✅ Email sent successfully:", data);

    return data;
  } catch (err) {
    console.error("❌ Failed to send email:", err.message);
    throw err;
  }
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