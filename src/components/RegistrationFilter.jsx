const filters = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
];

export function RegistrationFilter({
  activeFilter,
  onFilterChange,
  counts,
}) {
  return (
    <div className="filter-tabs" aria-label="Filter registrations">
      {filters.map((filter) => (
        <button
          className={activeFilter === filter.value ? "active" : ""}
          type="button"
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          aria-pressed={activeFilter === filter.value}
        >
          {filter.label}
          <span>{counts[filter.value]}</span>
        </button>
      ))}
    </div>
  );
}
