import React from "react";
import { StatCard, StatusBadge, Avatar } from "../components/UIComponents";
import { useStudents } from "../hooks/useStudents";
import { formatCurrency, formatDate } from "../utils/helpers";

const Dashboard = ({ bills, stats, onNavigate, students }) => {
  const recent = [...bills].sort((a, b) => (b.paidDate || "").localeCompare(a.paidDate || "")).slice(0, 5);
  const overdueList = bills.filter((b) => b.status === "overdue").slice(0, 4);

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-sub">Overview of student payments — {new Date().toLocaleDateString("en-PH", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
      </div>

      <div className="stats-grid">
        <StatCard icon="₱" label="Total Revenue" value={formatCurrency(stats.totalRevenue)} sub={`${stats.paid} payments received`} accent="green" />
        <StatCard icon="⏳" label="Pending Amount" value={formatCurrency(stats.totalPending)} sub={`${stats.pending} bills pending`} accent="yellow" />
        <StatCard icon="⚠" label="Overdue Bills" value={stats.overdue} sub="Requires immediate action" accent="red" />
        <StatCard icon="📊" label="Collection Rate" value={`${Math.round((stats.paid / stats.total) * 100)}%`} sub={`${stats.paid} of ${stats.total} bills paid`} accent="blue" />
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h3 className="card-title">Recent Payments</h3>
          <div className="activity-list">
            {recent.filter(b => b.status === "paid").length === 0 && <p className="empty-text">No recent payments</p>}
            {recent.filter(b => b.status === "paid").map((bill) => {
              const student = students.find((s) => s.id === bill.studentId);
              return (
                <div key={bill.id} className="activity-item">
                  <Avatar initials={student?.avatar} size="sm" />
                  <div className="activity-info">
                    <p className="activity-name">{student?.name}</p>
                    <p className="activity-detail">{bill.type} · {formatDate(bill.paidDate)}</p>
                  </div>
                  <div className="activity-amount">
                    <span className="amount-text">{formatCurrency(bill.amount)}</span>
                    <StatusBadge status="paid" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card">
          <h3 className="card-title">Overdue Alerts</h3>
          <div className="activity-list">
            {overdueList.length === 0 && <p className="empty-text">No overdue bills 🎉</p>}
            {overdueList.map((bill) => {
              const student = students.find((s) => s.id === bill.studentId);
              return (
                <div key={bill.id} className="activity-item">
                  <div className="overdue-indicator">!</div>
                  <div className="activity-info">
                    <p className="activity-name">{student?.name}</p>
                    <p className="activity-detail overdue-text">Due {formatDate(bill.dueDate)} · {bill.type}</p>
                  </div>
                  <span className="amount-overdue">{formatCurrency(bill.amount)}</span>
                </div>
              );
            })}
          </div>
          {overdueList.length > 0 && (
            <button className="btn btn--ghost btn--sm mt-8" onClick={() => onNavigate("bills")}>View all overdue →</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
