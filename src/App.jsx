// =============================================
// REACT & ROUTER IMPORTS
// =============================================
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// =============================================
// STYLES IMPORTS
// =============================================
// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css';
// Estilos globales de la aplicación
import './App.css';

// =============================================
// LAYOUT COMPONENTS IMPORTS
// =============================================
import Navbar from './assets/components/Navbar';
import Footer from './assets/components/Footer';
import WhatsAppFloatingMenu from './assets/components/WhatsAppFloatingMenu';

// =============================================
// PAGE COMPONENTS IMPORTS
// =============================================
import Inicio from './assets/pages/Inicio';
import AboutUs from './assets/pages/AboutUs';
import Carrocerias from './assets/pages/Carrocerias';
import Camiones from './assets/pages/Camiones';
import CarroceriaDetalle from './assets/pages/CarroceriaDetalle';
import CamionesDetalle from './assets/pages/CamionesDetalle';
import NotFoundPage from "./assets/pages/NotFoundPage.jsx";

// =============================================
// CONSTANTS - Definición de rutas
// =============================================
const APP_ROUTES = [
  { path: '/', element: <Inicio />, name: 'Inicio' },
  { path: '/about', element: <AboutUs />, name: 'Nosotros' },
  { path: '/carrocerias', element: <Carrocerias />, name: 'Carrocerías' },
  { 
    path: '/carrocerias/:id', 
    element: <CarroceriaDetalle />, 
    name: 'Detalle Carrocería' 
  },
  { path: '/camiones', element: <Camiones />, name: 'Camiones' },
  { 
    path: '/camiones/:id', 
    element: <CamionesDetalle />, 
    name: 'Detalle Camión' 
  },
  { path: '*', element: <NotFoundPage />, name: 'Página no encontrada' }
];

// =============================================
// MAIN APP COMPONENT
// =============================================
const App = () => {
  // Filtramos las rutas principales para el navbar (excluyendo rutas dinámicas y 404)
  const mainRoutes = APP_ROUTES.filter(
    route => !route.path.includes(':') && route.path !== '*'
  );

  return (
    <Router>
      <div className="app-container d-flex flex-column min-vh-100">
        {/* Navbar con rutas principales */}
        <Navbar routes={mainRoutes} />
        
        {/* Contenido principal */}
        <main className="flex-grow-1 py-5 mt-4">
          <div className="container">
            <Routes>
              {APP_ROUTES.map((route, index) => (
                <Route 
                  key={`route-${index}`} 
                  path={route.path} 
                  element={route.element} 
                />
              ))}
            </Routes>
          </div>
        </main>
        
        {/* Footer con rutas principales */}
        <Footer routes={mainRoutes} />
        
        {/* Componente flotante de WhatsApp */}
        <WhatsAppFloatingMenu />
      </div>
    </Router>
  );
};

export default App;