// export const STUDENTS = [
//   { id: "2024-00001", name: "Maria Santos", course: "BS Computer Science", year: 2, email: "maria.santos@ub.edu.ph", avatar: "MS" },
//   { id: "2024-00002", name: "Juan dela Cruz", course: "BS Nursing", year: 1, email: "juan.delacruz@ub.edu.ph", avatar: "JD" },
//   { id: "2024-00003", name: "Ana Reyes", course: "BS Business Administration", year: 3, email: "ana.reyes@ub.edu.ph", avatar: "AR" },
//   { id: "2024-00004", name: "Carlo Mendoza", course: "BS Civil Engineering", year: 4, email: "carlo.mendoza@ub.edu.ph", avatar: "CM" },
//   { id: "2024-00005", name: "Liza Garcia", course: "BS Education", year: 2, email: "liza.garcia@ub.edu.ph", avatar: "LG" },
//   { id: "2024-00006", name: "Marco Villanueva", course: "BS Computer Science", year: 1, email: "marco.villanueva@ub.edu.ph", avatar: "MV" },
//   { id: "2024-00007", name: "Sofia Torres", course: "BS Accountancy", year: 3, email: "sofia.torres@ub.edu.ph", avatar: "ST" },
//   { id: "2024-00008", name: "Ryan Castro", course: "BS Architecture", year: 2, email: "ryan.castro@ub.edu.ph", avatar: "RC" },
// ];

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
