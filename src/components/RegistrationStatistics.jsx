export function RegistrationStatistics({ total, confirmed, pending }) {
  const statistics = [
    { label: "Total registered", value: total, icon: "↗", tone: "blue" },
    { label: "Confirmed", value: confirmed, icon: "✓", tone: "green" },
    { label: "Awaiting review", value: pending, icon: "○", tone: "amber" },
  ];

  return (
    <section className="stats-grid" aria-label="Registration statistics">
      {statistics.map((statistic) => (
        <article className={`stat-card ${statistic.tone}`} key={statistic.label}>
          <span className="stat-icon" aria-hidden="true">{statistic.icon}</span>
          <div>
            <p>{statistic.label}</p>
            <strong>{statistic.value}</strong>
          </div>
        </article>
      ))}
    </section>
  );
}
