import React, { useState } from "react";
import {
  StatusBadge,
  Modal,
  SectionHeader,
  EmptyState,
} from "../components/UIComponents";
import { formatCurrency, formatDate, getDaysOverdue } from "../utils/helpers";

const FILTERS = ["all", "pending", "paid", "overdue"];

const AddBillForm = ({ students, onAdd, onClose }) => {
  const [form, setForm] = useState({
    studentId: "",
    type: "",
    amount: "",
    dueDate: "",
    semester: "2nd Sem AY 2024-2025",
  });

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!form.studentId || !form.type || !form.amount || !form.dueDate) return;

    onAdd({ ...form, amount: Number(form.amount), paidDate: null });
    onClose();
  };

  return (
    <div className="form-grid">
      <div className="form-group">
        <label>Student</label>
        <select
          value={form.studentId}
          onChange={(e) => update("studentId", e.target.value)}
        >
          <option value=""> Select Student </option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Bill Type</label>
        <input
          value={form.type}
          onChange={(e) => update("type", e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Amount</label>
        <input
          type="number"
          value={form.amount}
          onChange={(e) => update("amount", e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Due Date</label>
        <input
          type="date"
          value={form.dueDate}
          onChange={(e) => update("dueDate", e.target.value)}
        />
      </div>

      <div className="form-group form-group--full">
        <button className="btn btn--primary" onClick={handleSubmit}>
          Create Bill
        </button>
      </div>
    </div>
  );
};

const BillRow = ({ bill, students, onMarkPaid, onSendEmail, onDeleteBill, emailStatus }) => {
  const student = students.find((s) => s.id === bill.studentId);
  const overdueDays =
    bill.status === "overdue" ? getDaysOverdue(bill.dueDate) : 0;

  return (
    <tr>
      <td>{bill.id}</td>
      <td>{student ? student.name : "Unknown"}</td>
      <td>{bill.type}</td>
      <td>{formatCurrency(bill.amount)}</td>
      <td>{formatDate(bill.dueDate)}</td>
      <td>{bill.paidDate ? formatDate(bill.paidDate) : "-"}</td>
      <td><StatusBadge status={bill.status} /></td>
      <td>{overdueDays > 0 && `${overdueDays} days`}</td>

      <td>
        {bill.status !== "paid" && (
          <button
            className="btn btn--sm btn--primary"
            onClick={() => onMarkPaid(bill.id)}
          >
            Mark Paid
          </button>
        )}

        <button onClick={() => onSendEmail(bill)} className="send-email-btn">
  {emailStatus[bill.id] === "sent"
    ? "Sent"
    : emailStatus[bill.id] === "error"
    ? "Error"
    : "Send Email"}
</button>
<button
  className="btn btn--sm btn--ghost"
  onClick={() => onDeleteBill(bill.id)}
>
  Delete
</button>
      </td>
    </tr>
  );
};

const BillTracker = ({
  bills,
  students,
  onMarkPaid,
  onAddBill,
  onDeleteBill,
  addEmailLog,
}) => {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [sending, setSending] = useState(false);
  const [emailStatus, setEmailStatus] = useState({});

  const handleSendEmail = async (bill) => {
  const student = students.find((s) => s.id === bill.studentId);

  if (!student) {
    setEmailStatus((prev) => ({ ...prev, [bill.id]: "error" }));
    return;
  }

  try {
    setSending(true);

    const res = await fetch("http://localhost:5000/api/send-email", {
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
      }),
    });

    // ✅ UPDATE EMAIL STATUS (button text)
    setEmailStatus((prev) => ({
      ...prev,
      [bill.id]: res.ok ? "sent" : "error",
    }));

    // ✅ ADD TO EMAIL LOG (THIS FIXES YOUR PAGE)
    if (res.ok) {
      addEmailLog({
        to: student.email,
        subject: `Billing Notice: ${bill.type}`,
        body: `Email sent to ${student.name} for ₱${bill.amount}`,
        type: bill.status === "paid" ? "paid" : "overdue",
      });
    }

  } catch (err) {
    setEmailStatus((prev) => ({ ...prev, [bill.id]: "error" }));
  } finally {
    setSending(false);
  }
};

  const filtered = bills.filter((bill) => {
    const student = students.find((s) => s.id === bill.studentId);

    const matchFilter = filter === "all" || bill.status === filter;

    const matchSearch =
      search === "" ||
      bill.id.toLowerCase().includes(search.toLowerCase()) ||
      student?.name.toLowerCase().includes(search.toLowerCase());

    return matchFilter && matchSearch;
  });

  return (
    <div className="page">
      <SectionHeader
        title="Bill Tracker"
        sub={`${filtered.length} bills`}
        action={
          <button
            className="btn btn--primary"
            onClick={() => setShowModal(true)}
          >
            + New Bill
          </button>
        }
      />

      <div className="toolbar">
        {FILTERS.map((f) => (
          <button
            key={f}
            className="btn btn--ghost"
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}

        <input
          className="search-input"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="table-wrapper">
        <table className="bills-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Student</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Due</th>
              <th>Paid</th>
              <th>Status</th>
              <th>Overdue</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="9">
                  <EmptyState icon="📭" title="No Bills" sub="Nothing found" />
                </td>
              </tr>
            ) : (
              filtered.map((bill) => (
                <BillRow
                  key={bill.id}
  bill={bill}
  students={students}
  onMarkPaid={onMarkPaid}
  onSendEmail={handleSendEmail}
  onDeleteBill={onDeleteBill}
  emailStatus={emailStatus}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Create Bill"
      >
        <AddBillForm
          students={students}
          onAdd={onAddBill}
          onClose={() => setShowModal(false)}
        />
      </Modal>
    </div>
  );
};

export default BillTracker;