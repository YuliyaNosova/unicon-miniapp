export default function Contacts() {
  return (
    <section className="contacts">
      <h2 className="section-title">Контакты</h2>

      <div className="contacts__item">
        <span className="contacts__icon">📞</span>
        <a href="tel:+74951542712" className="contacts__link">+7 (495) 154-27-12</a>
      </div>

      <div className="contacts__item">
        <span className="contacts__icon">✉️</span>
        <a href="mailto:info@ubpo.ru" className="contacts__link">info@ubpo.ru</a>
      </div>

      <div className="contacts__item">
        <span className="contacts__icon">📍</span>
        <span className="contacts__text">
          г. Москва, ул. Малая Семёновская, д. 9, стр. 12
        </span>
      </div>

      <div className="contacts__socials">
        <a
          href="https://vk.com/ubporu"
          target="_blank"
          rel="noopener noreferrer"
          className="contacts__social"
        >
          VK
        </a>
        <a
          href="https://t.me/Uniconoutsourcingnew"
          target="_blank"
          rel="noopener noreferrer"
          className="contacts__social"
        >
          Telegram
        </a>
      </div>
    </section>
  );
}
