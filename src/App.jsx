import { useState } from "react";
import { RegistrationFilter } from "./components/RegistrationFilter";
import { RegistrationForm } from "./components/RegistrationForm";
import { RegistrationStatistics } from "./components/RegistrationStatistics";
import { StudentList } from "./components/StudentList";
import "./App.css";

const courses = [
  { code: "REACT-301", name: "React Development", accent: "blue" },
  { code: "JS-201", name: "JavaScript Fundamentals", accent: "violet" },
  { code: "UI-220", name: "UI Engineering", accent: "rose" },
  { code: "FULL-401", name: "Full-Stack Development", accent: "amber" },
  { code: "NODE-310", name: "Node.js & Express", accent: "green" },
];

let registrationSequence = 0;

function App() {
  // State stores every registration and the filter selected by the user.
  const [students, setStudents] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");

  // Statistics and filtered lists are derived from the main student state.
  const confirmedCount = students.filter(
    (student) => student.isConfirmed,
  ).length;

  const filteredStudents = students.filter((student) => {
    if (activeFilter === "confirmed") return student.isConfirmed;
    if (activeFilter === "pending") return !student.isConfirmed;
    return true;
  });

  function handleRegister(name, courseCode) {
    const selectedCourse = courses.find(
      (course) => course.code === courseCode,
    );
    if (!selectedCourse) return;

    const newStudent = {
      // A stable ID is required because React uses it as the list key.
      id: `${Date.now()}-${registrationSequence++}`,
      name,
      course: selectedCourse,
      isConfirmed: false,
    };

    console.log("[Registration Manager] Student registered:", newStudent);
    setStudents((currentStudents) => [newStudent, ...currentStudents]);
  }

  function handleToggleConfirmation(studentId) {
    const selectedStudent = students.find(
      (student) => student.id === studentId,
    );
    console.log(
      "[Registration Manager] Confirmation changed:",
      selectedStudent
        ? {
            ...selectedStudent,
            isConfirmed: !selectedStudent.isConfirmed,
          }
        : { studentId, missing: true },
    );

    // map() creates a new array while updating only the selected student.
    setStudents((currentStudents) =>
      currentStudents.map((student) =>
        student.id === studentId
          ? { ...student, isConfirmed: !student.isConfirmed }
          : student,
      ),
    );
  }

  function handleRemove(studentId) {
    const removedStudent = students.find(
      (student) => student.id === studentId,
    );
    console.log("[Registration Manager] Student removed:", removedStudent);

    // filter() removes the registration without mutating the existing array.
    setStudents((currentStudents) =>
      currentStudents.filter((student) => student.id !== studentId),
    );
  }

  function handleFilterChange(filter) {
    console.log("[Registration Manager] Filter selected:", filter);
    setActiveFilter(filter);
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#main-content" aria-label="CourseFlow home">
          <span className="brand-mark" aria-hidden="true">CF</span>
          <span>
            <strong>CourseFlow</strong>
            <small>Registration Manager</small>
          </span>
        </a>
        <span className="term-pill">2026 · Summer term</span>
      </header>

      <div className="page-wrap" id="main-content">
        <section className="hero" aria-labelledby="page-heading">
          <div>
            <p className="eyebrow">
              <span aria-hidden="true">●</span> Registration is open
            </p>
            <h1 id="page-heading">Build your next class.</h1>
            <p className="hero-copy">
              Register students, manage confirmations, and keep every course
              roster beautifully organized.
            </p>
          </div>
          <div className="hero-art" aria-hidden="true">
            <span className="orb orb-one" />
            <span className="orb orb-two" />
            <span className="hero-glyph">✓</span>
          </div>
        </section>

        <RegistrationStatistics
          total={students.length}
          confirmed={confirmedCount}
          pending={students.length - confirmedCount}
        />

        <div className="workspace-grid">
          <RegistrationForm courses={courses} onRegister={handleRegister} />

          <section className="roster-panel" aria-labelledby="roster-heading">
            <div className="roster-heading">
              <div>
                <p className="section-kicker">Current roster</p>
                <h2 id="roster-heading">Student registrations</h2>
              </div>
              <span className="registration-count">
                {students.length} {students.length === 1 ? "student" : "students"}
              </span>
            </div>

            <RegistrationFilter
              activeFilter={activeFilter}
              onFilterChange={handleFilterChange}
              counts={{
                all: students.length,
                pending: students.length - confirmedCount,
                confirmed: confirmedCount,
              }}
            />

            <StudentList
              students={filteredStudents}
              activeFilter={activeFilter}
              hasRegistrations={students.length > 0}
              onToggleConfirmation={handleToggleConfirmation}
              onRemove={handleRemove}
            />
          </section>
        </div>
      </div>

      <footer>
        <span>CourseFlow</span>
        <span>Simple enrollment, thoughtfully managed.</span>
      </footer>
    </main>
  );
}

export default App;
