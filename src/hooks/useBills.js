import { useState, useEffect, useCallback } from "react";
import { INITIAL_BILLS } from "../data/mockData";
import { getBillStatus } from "../utils/helpers";
import { sendEmail } from "../utils/api";

export const useBills = (students = []) => {
  const BILLS_KEY = "ub_bills";
  const EMAIL_LOG_KEY = "ub_email_log";

  const [bills, setBills] = useState(() => {
    const saved = localStorage.getItem(BILLS_KEY);
    return saved
      ? JSON.parse(saved)
      : INITIAL_BILLS.map((b) => ({ ...b, status: getBillStatus(b) }));
  });

  const [emailLog, setEmailLog] = useState(() => {
    const saved = localStorage.getItem(EMAIL_LOG_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    localStorage.setItem(BILLS_KEY, JSON.stringify(bills));
  }, [bills]);

  useEffect(() => {
    localStorage.setItem(EMAIL_LOG_KEY, JSON.stringify(emailLog));
  }, [emailLog]);

  const addNotification = useCallback((message, type = "info") => {
    const id = Date.now();
    setNotifications((prev) => [{ id, message, type }, ...prev]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4000);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBills((prev) => {
        prev.forEach(async (bill) => {
          const computed = getBillStatus(bill);

          if (computed !== bill.status && bill.status !== "paid") {
            const student = students.find((s) => s.id === bill.studentId);

            if (computed === "overdue" && student) {
              await sendEmail("overdue", student, bill);

              setEmailLog((log) => [
                {
                  to: student.email,
                  subject: `Overdue Notice – ${bill.type}`,
                  body: "Sent via Resend API",
                  sentAt: new Date().toISOString(),
                  type: "overdue",
                },
                ...log,
              ]);

              addNotification(
                `Overdue notice sent to ${student.name}`,
                "warning"
              );
            }
          }
        });

        return prev.map((bill) => ({
          ...bill,
          status: getBillStatus(bill),
        }));
      });
    }, 30000);

    return () => clearInterval(interval);
  }, [students, addNotification]);

  const markAsPaid = useCallback(
    async (billId) => {
      let updatedBill = null;
      let student = null;

      setBills((prev) =>
        prev.map((bill) => {
          if (bill.id !== billId) return bill;

          updatedBill = {
            ...bill,
            status: "paid",
            paidDate: new Date().toISOString().split("T")[0],
          };

          student = students.find((s) => s.id === bill.studentId);

          return updatedBill;
        })
      );

      if (student && updatedBill) {
        await sendEmail("paid", student, updatedBill);

        setEmailLog((log) => [
          {
            to: student.email,
            subject: `Payment Confirmed – ${updatedBill.type}`,
            body: "Sent via Resend API",
            sentAt: new Date().toISOString(),
            type: "paid",
          },
          ...log,
        ]);

        addNotification(
          `Payment confirmed for ${student.name}`,
          "success"
        );
      }
    },
    [students, addNotification]
  );

  const addBill = useCallback(
    (newBill) => {
      const bill = {
        ...newBill,
        id: `BILL-${Date.now()}`,
        status: getBillStatus(newBill),
        paidDate: null,
      };

      setBills((prev) => [bill, ...prev]);
      addNotification("New bill created", "success");
    },
    [addNotification]
  );

  const dismissNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const stats = {
    total: bills.length,
    paid: bills.filter((b) => b.status === "paid").length,
    overdue: bills.filter((b) => b.status === "overdue").length,
    pending: bills.filter((b) => b.status === "pending").length,
    totalRevenue: bills
      .filter((b) => b.status === "paid")
      .reduce((s, b) => s + b.amount, 0),
    totalPending: bills
      .filter((b) => b.status !== "paid")
      .reduce((s, b) => s + b.amount, 0),
  };

  return {
    bills,
    emailLog,
    notifications,
    stats,
    markAsPaid,
    addBill,
    dismissNotification,
  };
};