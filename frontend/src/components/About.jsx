const stats = [
  { value: "20+", label: "лет на рынке" },
  { value: "500+", label: "клиентов" },
  { value: "500+", label: "экспертов" },
  { value: "700+", label: "проектов" },
];

export default function About() {
  return (
    <section className="about">
      <div className="about__stats">
        {stats.map((s) => (
          <div className="stat" key={s.label + s.value}>
            <span className="stat__value">{s.value}</span>
            <span className="stat__label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
