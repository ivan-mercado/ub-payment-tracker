import React from "react";

const NAV_ITEMS = [
  { id: "dashboard", icon: "⊞", label: "Dashboard" },
  { id: "bills", icon: "📋", label: "Bill Tracker" },
  { id: "students", icon: "🎓", label: "Students" },
  { id: "email-log", icon: "✉", label: "Email Log" },
];

const Sidebar = ({ activePage, onNavigate }) => (
  <aside className="sidebar">
    <div className="sidebar-brand">
      <div className="brand-logo">UB</div>
      <div className="brand-text">
        <span className="brand-name">University of Batangas</span>
        <span className="brand-sub">Payment Monitoring</span>
      </div>
    </div>

    <nav className="sidebar-nav">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          className={`nav-item ${activePage === item.id ? "nav-item--active" : ""}`}
          onClick={() => onNavigate(item.id)}
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
          {activePage === item.id && <span className="nav-indicator" />}
        </button>
      ))}
    </nav>

    <div className="sidebar-footer">
      <div className="semester-badge">2nd Sem · AY 2024–2025</div>
    </div>
  </aside>
);

export default Sidebar;
