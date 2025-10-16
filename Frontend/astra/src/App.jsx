import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { HomePage } from './HomePage';
import { AboutPage } from './AboutPage';
import { ContactPage } from './ContactPage';
import { Menu } from './Menu';
import { ModalAppointmentForm  } from './modals/ModalAppointmentForm'

function App() {
  return (
    <HashRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ModalAppointmentForm" element={<ModalAppointmentForm />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
