function getInitials(name) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function StudentItem({
  student,
  onToggleConfirmation,
  onRemove,
}) {
  return (
    <li className="student-item">
      <div className={`avatar ${student.course.accent}`} aria-hidden="true">
        {getInitials(student.name)}
      </div>

      <div className="student-details">
        <div className="student-name-row">
          <h3>{student.name}</h3>
          <span
            className={`status ${student.isConfirmed ? "confirmed" : "pending"}`}
          >
            <i aria-hidden="true" />
            {student.isConfirmed ? "Confirmed" : "Pending"}
          </span>
        </div>
        <p>
          <span>{student.course.code}</span>
          {student.course.name}
        </p>
      </div>

      <div className="student-actions">
        <button
          className="confirmation-button"
          type="button"
          onClick={() => onToggleConfirmation(student.id)}
          aria-label={`${student.isConfirmed ? "Mark as pending" : "Confirm"} ${student.name}'s registration`}
        >
          {student.isConfirmed ? "Mark pending" : "Confirm"}
        </button>
        <button
          className="remove-button"
          type="button"
          onClick={() => onRemove(student.id)}
          aria-label={`Remove ${student.name}`}
          title={`Remove ${student.name}`}
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
    </li>
  );
}
