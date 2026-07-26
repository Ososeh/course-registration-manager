export function EmptyState({ isFiltered, activeFilter }) {
  const filteredLabel =
    activeFilter === "confirmed"
      ? "confirmed registrations"
      : "pending registrations";

  return (
    <div className="empty-state" role="status">
      <div className="empty-illustration" aria-hidden="true">
        <span>+</span>
      </div>
      <h3>{isFiltered ? `No ${filteredLabel}` : "Your roster is ready"}</h3>
      <p>
        {isFiltered
          ? "Try another filter or update a student's confirmation status."
          : "Register your first student using the form to begin building this term's roster."}
      </p>
    </div>
  );
}
