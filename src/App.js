import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import BillTracker from "./pages/BillTracker";
import Students from "./pages/Students";
import EmailLog from "./pages/EmailLog";
import Login from "./pages/Login";
import { NotificationToast } from "./components/UIComponents";
import { useBills, addEmailLog } from "./hooks/useBills";
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
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const { students, addStudent, deleteStudent } = useStudents();

  const {
    bills,
  emailLog,
  notifications,
  stats,
  markAsPaid,
  addBill,
  addEmailLog,
  dismissNotification,
  } = useBills(students);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setCheckingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  if (checkingAuth) return <div>Loading...</div>;

  if (!user) return <Login />;

  const PageComponent = PAGES[page];

  const pageProps = {
    students,
  bills,
  stats,
  emailLog,
  addEmailLog,
  onMarkPaid: markAsPaid,
  onAddBill: addBill,
  onNavigate: setPage,
  addStudent,
  deleteStudent,
  };

  return (
    <div className="app-layout">
      <Sidebar activePage={page} onNavigate={setPage} />

      <main className="main-content">
        <button className="logout-btn" onClick={() => signOut(auth)}>
          Logout
        </button>

        <PageComponent {...pageProps} />
      </main>

      <NotificationToast
        notifications={notifications}
        onDismiss={dismissNotification}
      />
    </div>
  );
}