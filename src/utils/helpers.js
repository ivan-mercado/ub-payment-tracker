export const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(amount);

export const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-PH", { year: "numeric", month: "short", day: "numeric" });
};

export const getDaysOverdue = (dueDate) => {
  const due = new Date(dueDate);
  const now = new Date();
  const diff = Math.floor((now - due) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
};

export const getBillStatus = (bill) => {
  if (bill.status === "paid") return "paid";
  const due = new Date(bill.dueDate);
  const now = new Date();
  if (now > due) return "overdue";
  return "pending";
};

export const simulateSendEmail = (type, student, bill) => {
  const templates = {
    paid: {
      subject: `✅ Payment Confirmed – ${bill.type}`,
      body: `Dear ${student.name},\n\nYour payment of ₱${bill.amount.toLocaleString()} for ${bill.type} has been received and confirmed.\n\nTransaction Date: ${new Date().toLocaleDateString("en-PH")}\nReference: ${bill.id}\n\nThank you for your prompt payment.\n\nUniversity of Batangas – Cashier's Office`,
    },
    overdue: {
      subject: `⚠️ Overdue Notice – ${bill.type}`,
      body: `Dear ${student.name},\n\nThis is a reminder that your ${bill.type} of ₱${bill.amount.toLocaleString()} was due on ${new Date(bill.dueDate).toLocaleDateString("en-PH")} and remains unpaid.\n\nPlease settle your account immediately to avoid penalties.\n\nFor inquiries, visit the Cashier's Office or call (043) 723-1446.\n\nUniversity of Batangas – Cashier's Office`,
    },
  };
  const tmpl = templates[type];
  return {
    to: student.email,
    subject: tmpl.subject,
    body: tmpl.body,
    sentAt: new Date().toISOString(),
    type,
  };
};
