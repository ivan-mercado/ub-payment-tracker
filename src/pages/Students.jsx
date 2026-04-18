import React, { useState } from "react";
import { SectionHeader } from "../components/UIComponents";
const Students = ({ students, addStudent, deleteStudent }) => {
  const [search, setSearch] = useState("");
  const [newStudent, setNewStudent] = useState({
    name: "",
    course: "",
    year: "",
    email: "",
  });
  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()),
  );
  const handleAdd = () => {
    if (!newStudent.name.trim()) return;
    addStudent({
      ...newStudent,
      avatar: newStudent.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase(),
    });
    setNewStudent({ name: "", course: "", year: "", email: "" });
  };
  return (
    <div className="page">
      {" "}
      <SectionHeader
        title="Students"
        sub={`${students.length} students`}
      />{" "}
      <div className="toolbar toolbar--single">
        {" "}
        <input
          className="search-input search-input--wide"
          placeholder="Search student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />{" "}
      </div>{" "}
      <div className="card">
        {" "}
        <h3>Add Student</h3>{" "}
        <input
          className="search-input"
          placeholder="Name"
          value={newStudent.name}
          onChange={(e) =>
            setNewStudent({ ...newStudent, name: e.target.value })
          }
        />{" "}
        <input
          className="search-input"
          placeholder="Course"
          value={newStudent.course}
          onChange={(e) =>
            setNewStudent({ ...newStudent, course: e.target.value })
          }
        />{" "}
        <input
          className="search-input"
          placeholder="Year"
          value={newStudent.year}
          onChange={(e) =>
            setNewStudent({ ...newStudent, year: e.target.value })
          }
        />{" "}
        <input
          className="search-input"
          placeholder="Email"
          value={newStudent.email}
          onChange={(e) =>
            setNewStudent({ ...newStudent, email: e.target.value })
          }
        />{" "}
        <br /> <br />{" "}
        <button className="btn btn--primary" onClick={handleAdd}>
          {" "}
          Add Student{" "}
        </button>{" "}
      </div>{" "}
      <br />{" "}
      <div className="students-grid">
        {" "}
        {filtered.map((student) => (
          <div className="student-card" key={student.id}>
            {" "}
            <h4>{student.name}</h4> <p>{student.course}</p>{" "}
            <p>{student.email}</p> <br />{" "}
            <button
              className="btn btn--ghost btn--sm"
              onClick={() => deleteStudent(student.id)}
            >
              {" "}
              Delete{" "}
            </button>{" "}
          </div>
        ))}{" "}
      </div>{" "}
    </div>
  );
};
export default Students;
