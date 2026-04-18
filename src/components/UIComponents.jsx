import React from "react";
import { formatCurrency } from "../utils/helpers";

export const StatusBadge = ({ status }) => {
  const config = {
    paid: { label: "Paid", class: "badge-paid" },
    overdue: { label: "Overdue", class: "badge-overdue" },
    pending: { label: "Pending", class: "badge-pending" },
  };
  const { label, class: cls } = config[status] || config.pending;
  return <span className={`badge ${cls}`}>{label}</span>;
};

export const StatCard = ({ icon, label, value, sub, accent }) => (
  <div className={`stat-card ${accent ? `stat-card--${accent}` : ""}`}>
    <div className="stat-icon">{icon}</div>
    <div className="stat-body">
      <p className="stat-label">{label}</p>
      <h3 className="stat-value">{value}</h3>
      {sub && <p className="stat-sub">{sub}</p>}
    </div>
  </div>
);

export const Avatar = ({ initials, size = "md" }) => (
  <div className={`avatar avatar--${size}`}>{initials}</div>
);

export const NotificationToast = ({ notifications, onDismiss }) => (
  <div className="toast-container">
    {notifications.map((n) => (
      <div key={n.id} className={`toast toast--${n.type}`}>
        <span className="toast-icon">
          {n.type === "success" ? "✓" : n.type === "warning" ? "⚠" : "ℹ"}
        </span>
        <span className="toast-msg">{n.message}</span>
        <button className="toast-close" onClick={() => onDismiss(n.id)}>×</button>
      </div>
    ))}
  </div>
);

export const EmptyState = ({ icon, title, sub }) => (
  <div className="empty-state">
    <div className="empty-icon">{icon}</div>
    <h4>{title}</h4>
    <p>{sub}</p>
  </div>
);

export const SectionHeader = ({ title, sub, action }) => (
  <div className="section-header">
    <div>
      <h2 className="section-title">{title}</h2>
      {sub && <p className="section-sub">{sub}</p>}
    </div>
    {action}
  </div>
);

export const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};
