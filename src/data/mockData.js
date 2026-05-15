const today = new Date();
const daysAgo = (n) => { const d = new Date(today); d.setDate(d.getDate() - n); return d.toISOString().split("T")[0]; };
const daysAhead = (n) => { const d = new Date(today); d.setDate(d.getDate() + n); return d.toISOString().split("T")[0]; };

export const INITIAL_BILLS = [
  // { id: "BILL-001", studentId: "2024-00001", type: "Tuition Fee", amount: 28500, dueDate: daysAgo(10), status: "overdue", paidDate: null, semester: "2nd Sem AY 2024-2025" },
  // { id: "BILL-002", studentId: "2024-00001", type: "Miscellaneous Fee", amount: 3200, dueDate: daysAhead(15), status: "pending", paidDate: null, semester: "2nd Sem AY 2024-2025" },
  // { id: "BILL-003", studentId: "2024-00002", type: "Tuition Fee", amount: 32000, dueDate: daysAgo(5), status: "paid", paidDate: daysAgo(6), semester: "2nd Sem AY 2024-2025" },
  // { id: "BILL-004", studentId: "2024-00002", type: "Laboratory Fee", amount: 4500, dueDate: daysAhead(20), status: "pending", paidDate: null, semester: "2nd Sem AY 2024-2025" },
  // { id: "BILL-005", studentId: "2024-00003", type: "Tuition Fee", amount: 26000, dueDate: daysAgo(2), status: "paid", paidDate: daysAgo(3), semester: "2nd Sem AY 2024-2025" },
  // { id: "BILL-006", studentId: "2024-00003", type: "Miscellaneous Fee", amount: 2800, dueDate: daysAgo(20), status: "overdue", paidDate: null, semester: "2nd Sem AY 2024-2025" },
  // { id: "BILL-007", studentId: "2024-00004", type: "Tuition Fee", amount: 34000, dueDate: daysAhead(5), status: "pending", paidDate: null, semester: "2nd Sem AY 2024-2025" },
  // { id: "BILL-008", studentId: "2024-00005", type: "Tuition Fee", amount: 22000, dueDate: daysAgo(1), status: "overdue", paidDate: null, semester: "2nd Sem AY 2024-2025" },
  // { id: "BILL-009", studentId: "2024-00005", type: "NSTP Fee", amount: 1500, dueDate: daysAhead(30), status: "pending", paidDate: null, semester: "2nd Sem AY 2024-2025" },
  // { id: "BILL-010", studentId: "2024-00006", type: "Tuition Fee", amount: 28500, dueDate: daysAhead(10), status: "pending", paidDate: null, semester: "2nd Sem AY 2024-2025" },
  // { id: "BILL-011", studentId: "2024-00007", type: "Tuition Fee", amount: 30000, dueDate: daysAgo(8), status: "paid", paidDate: daysAgo(9), semester: "2nd Sem AY 2024-2025" },
  // { id: "BILL-012", studentId: "2024-00007", type: "CPA Review Fee", amount: 8000, dueDate: daysAhead(25), status: "pending", paidDate: null, semester: "2nd Sem AY 2024-2025" },
  // { id: "BILL-013", studentId: "2024-00008", type: "Tuition Fee", amount: 33000, dueDate: daysAgo(15), status: "overdue", paidDate: null, semester: "2nd Sem AY 2024-2025" },
  // { id: "BILL-014", studentId: "2024-00008", type: "Materials Fee", amount: 5500, dueDate: daysAhead(8), status: "pending", paidDate: null, semester: "2nd Sem AY 2024-2025" },
];
