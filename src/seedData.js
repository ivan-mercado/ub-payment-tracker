import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

export const seedDatabase = async () => {
  try {
    console.log("Seeding database...");

    // 🔹 1. Create students
    const studentsData = [
      { name: "Juan Dela Cruz", course: "BS Computer Engineering", year: "3", email: "juan@gmail.com" },
      { name: "Maria Santos", course: "BS IT", year: "2", email: "maria@gmail.com" },
      { name: "Carlos Reyes", course: "BS Civil Engineering", year: "4", email: "carlos@gmail.com" },
      { name: "Anna Lopez", course: "BS Accountancy", year: "1", email: "anna@gmail.com" },
      { name: "Mark Villanueva", course: "BS Computer Science", year: "3", email: "mark@gmail.com" },
    ];

    const studentRefs = [];

    for (let student of studentsData) {
      const docRef = await addDoc(collection(db, "students"), {
        ...student,
        avatar: student.name
          .split(" ")
          .map((w) => w[0])
          .join("")
          .toUpperCase(),
      });

      studentRefs.push(docRef.id);
    }

    console.log("Students created");

    // 🔹 2. Create bills (linked to students)
    const billsData = [
      {
        studentId: studentRefs[0],
        type: "Tuition Fee",
        amount: 25000,
        dueDate: "2026-04-10",
        status: "overdue",
        paidDate: null,
      },
      {
        studentId: studentRefs[1],
        type: "Misc Fee",
        amount: 5000,
        dueDate: "2026-05-20",
        status: "pending",
        paidDate: null,
      },
      {
        studentId: studentRefs[2],
        type: "Lab Fee",
        amount: 3000,
        dueDate: "2026-03-15",
        status: "paid",
        paidDate: "2026-03-10",
      },
      {
        studentId: studentRefs[0],
        type: "NSTP Fee",
        amount: 1500,
        dueDate: "2026-04-25",
        status: "overdue",
        paidDate: null,
      },
      {
        studentId: studentRefs[3],
        type: "Tuition Fee",
        amount: 28000,
        dueDate: "2026-05-30",
        status: "pending",
        paidDate: null,
      },
    ];

    for (let bill of billsData) {
      await addDoc(collection(db, "bills"), bill);
    }

    console.log("Bills created ✅");

  } catch (err) {
    console.error("Seeding failed:", err);
  }
};