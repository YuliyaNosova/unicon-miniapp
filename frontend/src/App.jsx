import Header from "./components/Header";
import About from "./components/About";
import Services from "./components/Services";
import Contacts from "./components/Contacts";
import RequestForm from "./components/RequestForm";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <Header />
      <About />
      <Services />
      <Contacts />
      <RequestForm />
    </div>
  );
}
