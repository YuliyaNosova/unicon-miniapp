import { useState } from "react";
import WebApp from "@twa-dev/sdk";

export default function RequestForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "" });
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(false);

    try {
      WebApp.sendData(JSON.stringify(form));
    } catch {
      setError(true);
    }
  };

  return (
    <section className="request-form">
      <h2 className="section-title">Оставить заявку</h2>

      <form onSubmit={handleSubmit} className="request-form__form">
        <input
          type="text"
          name="name"
          placeholder="Ваше имя"
          required
          value={form.name}
          onChange={handleChange}
          className="input"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={handleChange}
          className="input"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Телефон"
          required
          value={form.phone}
          onChange={handleChange}
          className="input"
        />
        <input
          type="text"
          name="company"
          placeholder="Компания"
          required
          value={form.company}
          onChange={handleChange}
          className="input"
        />

        <button type="submit" className="btn btn--primary">
          Оставить заявку
        </button>

        {error && (
          <p className="request-form__error">Не удалось отправить. Попробуйте ещё раз.</p>
        )}
      </form>
    </section>
  );
}
