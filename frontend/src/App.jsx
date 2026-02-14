import Header from "./components/Header";
import About from "./components/About";
import Services from "./components/Services";
import Contacts from "./components/Contacts";
import RequestForm from "./components/RequestForm";
import "./App.css";

export default function App() {
  const scrollToForm = () => {
    document.querySelector(".request-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="app">
      <Header />
      <About />
      <Services />
      <div className="cta-wrap">
        <button className="btn--cta" onClick={scrollToForm}>
          Оставить заявку
        </button>
      </div>
      <Contacts />
      <RequestForm />
    </div>
  );
}
