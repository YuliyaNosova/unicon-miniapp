const stats = [
  { value: "20+", label: "лет на рынке" },
  { value: "500+", label: "экспертов" },
  { value: "700+", label: "проектов" },
  { value: "ТОП-5", label: "аутсорсинг РФ" },
];

export default function About() {
  return (
    <section className="about">
      <h2 className="section-title">О компании</h2>
      <p className="about__text">
        АО «Юникон Бизнес Сервис» — аутсорсинг бухгалтерии, кадрового учёта и ИТ-решений
        для крупного и среднего бизнеса. Лауреат премии за лучший клиентский опыт в сегменте B2B.
        Страховая ответственность в СПАО «Ингосстрах».
      </p>
      <div className="about__stats">
        {stats.map((s) => (
          <div className="stat" key={s.label}>
            <span className="stat__value">{s.value}</span>
            <span className="stat__label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
