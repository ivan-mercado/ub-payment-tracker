import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
export const useStudents = () => {
  const [students, setStudents] = useState([]);
  const fetchStudents = async () => {
    const snapshot = await getDocs(collection(db, "students"));
    const list = snapshot.docs.map((docItem) => ({
      id: docItem.id,
      ...docItem.data(),
    }));
    setStudents(list);
  };
  useEffect(() => {
    fetchStudents();
  }, []);
  const addStudent = async (student) => {
    await addDoc(collection(db, "students"), student);
    fetchStudents();
  };
  const deleteStudent = async (id) => {
    await deleteDoc(doc(db, "students", id));
    fetchStudents();
  };
  return { students, addStudent, deleteStudent };
};
