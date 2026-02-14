const PhoneIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00EE69" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
    <polyline points="7 8 10 11 13 8 17 12"/>
  </svg>
);

const UsersIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00EE69" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const BriefcaseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00EE69" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
    <line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/>
  </svg>
);

const ScaleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00EE69" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);

const ServerIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00EE69" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/>
    <line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>
  </svg>
);

const services = [
  {
    Icon: PhoneIcon,
    title: "Бухгалтерский учёт",
    desc: "Комплексное ведение, налоговый и управленческий учёт",
  },
  {
    Icon: UsersIcon,
    title: "Кадры и зарплата",
    desc: "Делопроизводство, расчёт зарплаты, охрана труда",
  },
  {
    Icon: BriefcaseIcon,
    title: "ИТ-решения 1С",
    desc: "Внедрение, поддержка, хостинг и аренда лицензий 1С",
  },
  {
    Icon: ScaleIcon,
    title: "Юридическая поддержка",
    desc: "Регистрация и ликвидация компаний, правовое сопровождение",
  },
  {
    Icon: ServerIcon,
    title: "Расчёт зарплаты",
    desc: "Полный и частичный аутсорсинг расчёта заработной платы",
  },
];

export default function Services() {
  return (
    <section className="services">
      <h2 className="section-title">Услуги</h2>
      <div className="services__list">
        {services.map((s) => (
          <div className="service-card" key={s.title}>
            <div className="service-card__icon">
              <s.Icon />
            </div>
            <div>
              <h3 className="service-card__title">{s.title}</h3>
              <p className="service-card__desc">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
