import React from "react";
import ubLogo from "../assets/ub-logo.png";

const NAV_ITEMS = [
  { id: "dashboard", icon: "⊞", label: "Dashboard" },
  { id: "bills", icon: "📋", label: "Bill Tracker" },
  { id: "students", icon: "🎓", label: "Students" },
  { id: "email-log", icon: "✉", label: "Email Log" },
];

const Sidebar = ({ activePage, onNavigate, onLogout }) => (
  <aside className="sidebar">
    <div className="sidebar-brand">
      <img src={ubLogo} alt="University of Batangas Logo" className="brand-logo-img" />
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
  <button className="sidebar-logout-btn" onClick={onLogout}>
    Logout
  </button>

  <div className="semester-badge">2nd Sem · AY 2024–2025</div>
</div>
  </aside>
);

export default Sidebar;
