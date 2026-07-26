import { useState } from "react";

export function RegistrationForm({ courses, onRegister }) {
  // Controlled inputs keep every form value inside React state.
  const [name, setName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [errors, setErrors] = useState({ name: "", course: "" });

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = {
      name: name.trim() ? "" : "Enter the student's name.",
      course: courseCode ? "" : "Choose a course.",
    };

    setErrors(nextErrors);
    if (nextErrors.name || nextErrors.course) {
      console.log("[Registration Manager] Validation errors:", nextErrors);
      return;
    }

    // The form sends valid data to App through the callback prop.
    onRegister(name.trim(), courseCode);
    setName("");
    setCourseCode("");
  }

  return (
    <aside className="form-card" aria-labelledby="registration-heading">
      <div className="card-icon" aria-hidden="true">+</div>
      <p className="section-kicker">New enrollment</p>
      <h2 id="registration-heading">Register a student</h2>
      <p className="form-intro">
        Add a learner to a course. New registrations begin as pending.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="field-group">
          <label htmlFor="student-name">Student name</label>
          <input
            id="student-name"
            type="text"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              if (errors.name) {
                setErrors((current) => ({ ...current, name: "" }));
              }
            }}
            placeholder="e.g. Ada Lovelace"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "student-name-error" : undefined}
          />
          {errors.name && (
            <p className="field-error" id="student-name-error" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div className="field-group">
          <label htmlFor="course">Course</label>
          <div className="select-wrap">
            <select
              id="course"
              value={courseCode}
              onChange={(event) => {
                setCourseCode(event.target.value);
                if (errors.course) {
                  setErrors((current) => ({ ...current, course: "" }));
                }
              }}
              aria-invalid={Boolean(errors.course)}
              aria-describedby={errors.course ? "course-error" : undefined}
            >
              <option value="">Select a course</option>
              {courses.map((course) => (
                <option key={course.code} value={course.code}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>
          {errors.course && (
            <p className="field-error" id="course-error" role="alert">
              {errors.course}
            </p>
          )}
        </div>

        <button className="primary-button" type="submit">
          <span aria-hidden="true">+</span> Register student
        </button>
      </form>

      <p className="privacy-note">
        <span aria-hidden="true">◇</span>
        Enrollment details stay in this browser session.
      </p>
    </aside>
  );
}
