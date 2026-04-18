import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import BillTracker from "./pages/BillTracker";
import Students from "./pages/Students";
import EmailLog from "./pages/EmailLog";
import { NotificationToast } from "./components/UIComponents";
import { useBills } from "./hooks/useBills";
import { useStudents } from "./hooks/useStudents";
import "./App.css";
const PAGES = {
  dashboard: Dashboard,
  bills: BillTracker,
  students: Students,
  "email-log": EmailLog,
};
export default function App() {
  const [page, setPage] = useState("dashboard");
  const { students, addStudent, deleteStudent } = useStudents();
  const {
    bills,
    emailLog,
    notifications,
    stats,
    markAsPaid,
    addBill,
    dismissNotification,
  } = useBills(students);
  const PageComponent = PAGES[page];
  const pageProps = {
    students,
    bills,
    stats,
    emailLog,
    onMarkPaid: markAsPaid,
    onAddBill: addBill,
    onNavigate: setPage,
    addStudent,
    deleteStudent,
  };
  return (
    <div className="app-layout">
      {" "}
      <Sidebar activePage={page} onNavigate={setPage} />{" "}
      <main className="main-content">
        {" "}
        <PageComponent {...pageProps} />{" "}
      </main>{" "}
      <NotificationToast
        notifications={notifications}
        onDismiss={dismissNotification}
      />{" "}
    </div>
  );
}
