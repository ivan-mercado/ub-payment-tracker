const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "";


const request = async (endpoint, options = {}) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000); 

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


      type: bill.type,


      emailType: type,

      paymentMethod,
      paidDate: bill.paidDate,
    }),
  });

  if (!response.ok) {
  const data = await response.json().catch(() => ({}));
  throw new Error(data.details || data.error || "Failed to send email");
}

  return response.json();
};

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