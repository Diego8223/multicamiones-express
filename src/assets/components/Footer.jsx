import React from 'react';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaWhatsapp, 
  FaTiktok,
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaTruck 
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            {/* Columna 1: Información de la empresa */}
            <div className="footer-col footer-about">
              <div className="footer-logo">
                <FaTruck className="logo-icon" />
                <span className="logo-text">Multicamiones<span>Express</span></span>
              </div>
              <p className="footer-description">
                Soluciones logísticas integrales con más de 10 años de experiencia en transporte de carga nacional.
              </p>
              <div className="footer-socials">
                <h4>Conéctate con nosotros</h4>
                <div className="social-links">
                  <a href="https://www.facebook.com/MULTICAMIONESEXPRESS/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-link facebook">
                    <FaFacebookF />
                  </a>
                  <a href="https://www.instagram.com/multicamionesexpresscol/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-link instagram">
                    <FaInstagram />
                  </a>
                  <a href="https://www.tiktok.com/@multicamionesexpr" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="social-link tiktok">
                    <FaTiktok />
                  </a>
                </div>
              </div>
            </div>

            {/* Columna 2: Enlaces rápidos */}
            <div className="footer-col footer-links">
              <h3>Enlaces rápidos</h3>
              <ul>
                <li><Link to="/" className="footer-link">Inicio</Link></li>
                <li><Link to="/nosotros" className="footer-link">Quienes Somos</Link></li>
                <li><Link to="/camiones" className="footer-link">Camiones</Link></li>
                <li><Link to="/carrocerias" className="footer-link">Carrocerías</Link></li>
              </ul>
            </div>

            {/* Columna 3: Servicios */}
<div className="footer-col footer-services">
  <h3>Nuestros servicios</h3>
  <ul>
    <li className="service-item">Compra y venta de camiones nuevos</li>
    <li className="service-item">Compra y venta de camiones usados</li>
    <li className="service-item">Venta de carrocerías nuevas</li>
    <li className="service-item">Venta de carrocerías usadas</li>
    <li className="service-item">Asesoría especializada en vehículos Productivos</li>
  </ul>
</div>

            {/* Columna 4: Contacto */}
            <div className="footer-col footer-contact">
              <h3>Contacto</h3>
              <ul className="contact-info">
                <li className="contact-item">
                  <FaMapMarkerAlt className="contact-icon" />
                  <span>Carrera 50 # 2 Sur - 189, Medellín, Colombia</span>
                </li>
                <li className="contact-item">
                  <FaEnvelope className="contact-icon" />
                  <a href="mailto:multicamionesexpressmed@gmail.com" className="contact-link">multicamionesexpressmed@gmail.com</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p className="copyright">
              &copy; {year} <strong>MulticamionesExpress</strong>. Todos los derechos reservados.
            </p>
            <div className="legal-links">
              <Link to="/politica-privacidad" className="legal-link">Política de privacidad</Link>
              <span className="divider">|</span>
              <Link to="/terminos-condiciones" className="legal-link">Términos y condiciones</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;