const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00EE69" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.47 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 5.55 5.55l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00EE69" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
);

const GlobeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00EE69" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const PinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00EE69" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

export default function Contacts() {
  return (
    <section className="contacts">
      <h2 className="section-title">Контакты</h2>

      <div className="contacts__item">
        <div className="contacts__icon"><PhoneIcon /></div>
        <div className="contacts__info">
          <span className="contacts__label">Телефон</span>
          <a href="tel:+74951542712" className="contacts__link">+7 (495) 154-27-12</a>
        </div>
      </div>

      <div className="contacts__item">
        <div className="contacts__icon"><MailIcon /></div>
        <div className="contacts__info">
          <span className="contacts__label">Email</span>
          <a href="mailto:outsourcing@ubpo.ru" className="contacts__link">outsourcing@ubpo.ru</a>
        </div>
      </div>

      <div className="contacts__item">
        <div className="contacts__icon"><GlobeIcon /></div>
        <div className="contacts__info">
          <span className="contacts__label">Сайт</span>
          <a href="https://ubpo.ru" target="_blank" rel="noopener noreferrer" className="contacts__link">ubpo.ru</a>
        </div>
      </div>

      <div className="contacts__item">
        <div className="contacts__icon"><PinIcon /></div>
        <div className="contacts__info">
          <span className="contacts__label">Адрес</span>
          <span className="contacts__text">Москва, ул. Малая Семёновская, д. 9, стр. 12</span>
        </div>
      </div>

      <div className="contacts__socials">
        <a href="https://vk.com/ubporu" target="_blank" rel="noopener noreferrer" className="contacts__social">
          VK
        </a>
        <a href="https://t.me/Uniconoutsourcingnew" target="_blank" rel="noopener noreferrer" className="contacts__social">
          Telegram
        </a>
      </div>
    </section>
  );
}
