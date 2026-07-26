import { EmptyState } from "./EmptyState";
import { StudentItem } from "./StudentItem";

export function StudentList({
  students,
  activeFilter,
  hasRegistrations,
  onToggleConfirmation,
  onRemove,
}) {
  if (students.length === 0) {
    return (
      <EmptyState
        isFiltered={hasRegistrations}
        activeFilter={activeFilter}
      />
    );
  }

  return (
    <ul className="student-list" aria-live="polite">
      {/* Stable IDs are used as keys so React can track each registration. */}
      {students.map((student) => (
        <StudentItem
          key={student.id}
          student={student}
          onToggleConfirmation={onToggleConfirmation}
          onRemove={onRemove}
        />
      ))}
    </ul>
  );
}
