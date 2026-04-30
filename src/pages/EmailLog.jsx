import React, { useState } from "react";
import { SectionHeader, EmptyState } from "../components/UIComponents";

const EmailLog = ({ emailLog, onDeleteEmailLog }) => {
  const [expanded, setExpanded] = useState(null);

  const toggle = (i) => {
    setExpanded(expanded === i ? null : i);
  };

  return (
    <div className="page">
      <SectionHeader
        title="Email Log"
        sub={`${emailLog.length} emails sent this session`}
      />

      {emailLog.length === 0 ? (
        <div className="card">
          <EmptyState
            icon="✉"
            title="No emails sent yet"
            sub="Email notifications will appear here when payments are marked or overdue notices are triggered"
          />
        </div>
      ) : (
        <div className="email-log">
          {emailLog.map((email, i) => (
            <div key={i} className={`email-item email-item--${email.type}`}>
              <div className="email-header" onClick={() => toggle(i)}>
                <div className="email-meta">
                  <span>
                    {email.type === "paid" ? "✅" : "⚠️"}
                  </span>

                  <div>
                    <p className="email-subject">{email.subject}</p>
                    <p className="email-to">To: {email.to}</p>
                  </div>
                </div>

                <div className="email-right">
                  <p className="email-time">
                    {new Date(email.sentAt).toLocaleTimeString("en-PH")}
                  </p>

                  <button
                    className="btn btn--sm btn--ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteEmailLog(i);
                    }}
                  >
                    Delete
                  </button>

                  <span className="email-toggle">
                    {expanded === i ? "▲" : "▼"}
                  </span>
                </div>
              </div>

              {expanded === i && (
                <div className="email-body">
                  <pre className="email-content">{email.body}</pre>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmailLog;