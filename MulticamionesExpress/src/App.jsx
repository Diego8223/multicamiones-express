import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

// Componentes
import Navbar from './assets/components/Navbar';
import Footer from './assets/components/Footer';
import WhatsAppFloatingMenu from './assets/components/WhatsAppFloatingMenu';
import MapComponent from "../src/assets/components/MapComponent";


// Páginas
import Inicio from './assets/pages/Inicio';
import AboutUs from './assets/pages/AboutUs';
import Carrocerias from './assets/pages/Carrocerias';
import Camiones from './assets/pages/Camiones';
import CarroceriaDetalle from './assets/pages/CarroceriaDetalle';
import CamionesDetalle from './assets/pages/CamionesDetalle';

const App = () => {
  return (
    <Router>
      <div className="app-container d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1 py-5 mt-4">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/carrocerias" element={<Carrocerias />} />
            <Route path="/carrocerias/:id" element={<CarroceriaDetalle />} />
            <Route path="/camiones" element={<Camiones />} />
            <Route path="/camiones/:id" element={<CamionesDetalle />} />
            {/* Eliminada la ruta NotFound */}
          </Routes>
        </main>
        <Footer />
        <WhatsAppFloatingMenu />
      </div>
    </Router>
  );
};

export default App;