import { useState } from "react";
import WebApp from "@twa-dev/sdk";

const API_URL = import.meta.env.VITE_API_URL || "";

export default function RequestForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const tgUser = WebApp.initDataUnsafe?.user;
      const payload = {
        ...form,
        tg_user_id: tgUser?.id,
        tg_username: tgUser?.username,
      };

      const res = await fetch(`${API_URL}/api/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Ошибка сервера");

      setStatus("success");
      setForm({ name: "", email: "", phone: "", company: "" });

      WebApp.HapticFeedback.notificationOccurred("success");
    } catch {
      setStatus("error");
      WebApp.HapticFeedback.notificationOccurred("error");
    }
  };

  if (status === "success") {
    return (
      <section className="request-form">
        <div className="request-form__success">
          <span className="request-form__success-icon">✓</span>
          <h3>Заявка отправлена!</h3>
          <p>Мы свяжемся с вами в ближайшее время.</p>
          <button className="btn btn--secondary" onClick={() => setStatus("idle")}>
            Отправить ещё
          </button>
        </div>
      </section>
    );
  }

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

        <button type="submit" className="btn btn--primary" disabled={status === "sending"}>
          {status === "sending" ? "Отправка..." : "Оставить заявку"}
        </button>

        {status === "error" && (
          <p className="request-form__error">Не удалось отправить. Попробуйте ещё раз.</p>
        )}
      </form>
    </section>
  );
}
