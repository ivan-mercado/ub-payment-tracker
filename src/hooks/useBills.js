import { useState, useEffect, useCallback } from "react";
import { INITIAL_BILLS } from "../data/mockData";
import { getBillStatus } from "../utils/helpers";
import { sendEmail } from "../utils/api";
import {
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";

export const useBills = (students = []) => {
  const BILLS_KEY = "ub_bills";
  const EMAIL_LOG_KEY = "ub_email_log";

  const [bills, setBills] = useState([]);

useEffect(() => {
  const fetchBills = async () => {
    const snapshot = await getDocs(collection(db, "bills"));

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setBills(data);
  };

  fetchBills();
}, []);

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
  async (billId, paymentMethod = "GCash") => {
      let updatedBill = null;
      let student = null;

      setBills((prev) =>
        prev.map((bill) => {
          if (bill.id !== billId) return bill;

          updatedBill = {
            ...bill,
            status: "paid",
            paidDate: new Date().toISOString().split("T")[0],
            paymentMethod,
          };

          student = students.find((s) => s.id === bill.studentId);

          return updatedBill;
        })
      );

      if (student && updatedBill) {
        await sendEmail("paid", student, updatedBill, paymentMethod);

        setEmailLog((log) => [
          {
            to: student.email,
            subject: `Payment Confirmed – ${updatedBill.type}`,
            body: `Payment receipt sent.

Student: ${student.name}
Bill: ${updatedBill.type}
Amount Paid: ₱${updatedBill.amount}
Payment Method: ${paymentMethod}
Paid Date: ${updatedBill.paidDate}`,
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
  async (newBill) => {
    const bill = {
      ...newBill,
      status: getBillStatus(newBill),
      paidDate: null,
    };

    const docRef = await addDoc(collection(db, "bills"), bill);

    setBills((prev) => [
      {
        id: docRef.id,
        ...bill,
      },
      ...prev,
    ]);

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
  const addEmailLog = (email) => {
  setEmailLog((log) => [
    {
      ...email,
      sentAt: new Date().toISOString(),
    },
    ...log,
  ]);
};
const deleteBill = async (billId) => {
  try {
    // 🔥 delete from Firestore
    await deleteDoc(doc(db, "bills", billId));

    // update UI
    setBills((prev) => prev.filter((bill) => bill.id !== billId));

    addNotification("Bill deleted", "warning");
  } catch (err) {
    console.error(err);
    addNotification("Failed to delete bill", "warning");
  }
};
const deleteEmailLog = (indexToDelete) => {
  setEmailLog((prev) => prev.filter((_, index) => index !== indexToDelete));
};
  return {
     bills,
  emailLog,
  notifications,
  stats,
  markAsPaid,
  addBill,
  deleteBill,
  addEmailLog,
  deleteEmailLog,
  dismissNotification,
  };
};