import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export function useStudents() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const snapshot = await getDocs(collection(db, "students"));

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setStudents(data);
    };

    fetchStudents();
  }, []);

  const addStudent = async (student) => {
    const docRef = await addDoc(collection(db, "students"), student);

    setStudents((prev) => [
      ...prev,
      {
        id: docRef.id,
        ...student,
      },
    ]);
  };

  const deleteStudent = async (id) => {
    await deleteDoc(doc(db, "students", id));

    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  return { students, addStudent, deleteStudent };
}