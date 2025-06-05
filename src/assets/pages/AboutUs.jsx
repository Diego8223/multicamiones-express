import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {
  FaTruck,
  FaSearchDollar,
  FaShieldAlt,
  FaUsersCog,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa';
import { GiSteeringWheel } from 'react-icons/gi';
import MapComponent from "/src/assets/components/MapComponent.jsx";
import './AboutUs.css';

const AboutUs = () => {
  const navigate = useNavigate();

  const handleInventoryClick = () => {
    navigate('/camiones');
  };

  const values = [
    {
      icon: <FaTruck className="value-icon" />,
      title: "Nuestra Trayectoria",
      description: "Más de 10 años especializados en la compra y venta de camiones y vehículos pesados.",
      overlay: {
        title: "Expertos en el sector",
        content: "Desde 2015 conectando compradores y vendedores con transparencia y profesionalismo.",
        button: "Ver historia"
      }
    },
    {
      icon: <FaSearchDollar className="value-icon" />,
      title: "Nuestro Método",
      description: "Valoraciones precisas y negociaciones justas para ambas partes.",
      overlay: {
        title: "Transparencia total",
        content: "Informes detallados del estado de cada vehículo. Sin sorpresas.",
        button: "Cómo trabajamos"
      }
    },
    {
      icon: <FaShieldAlt className="value-icon" />,
      title: "Garantía de Calidad",
      description: "Todos nuestros vehículos pasan por rigurosas inspecciones técnicas.",
      overlay: {
        title: "Compra con confianza",
        content: "Certificados de mantenimiento y historial completo incluidos.",
        button: "Nuestros estándares"
      }
    },
    {
      icon: <FaUsersCog className="value-icon" />,
      title: "Servicio Personalizado",
      description: "Asesoramiento experto para encontrar la solución perfecta.",
      overlay: {
        title: "Para profesionales",
        content: "Entendemos las necesidades específicas del transporte pesado.",
        button: "Contactar asesor"
      }
    }
  ];

  // Configuración simplificada del mapa
  const mapConfig = {
    initialPosition: [6.2027037, -75.5833673],
    zoomLevel: 15, // Zoom un poco más alejado
    markerTitle: 'Multicamiones Express',
    popupContent: `
      <div style="padding: 8px; text-align: center;">
        <h3 style="font-size: 1.2rem; margin-bottom: 0.5rem; color: #0d6efd;">Multicamiones Express</h3>
        <p style="margin-bottom: 0.5rem;"><i class="fas fa-map-marker-alt"></i> Medellín, Colombia</p>
        <a href="https://maps.google.com/?q=Carrera+50+2+Sur+189,+Medellín" target="_blank" style="color: #0d6efd; text-decoration: none;">
          Ver dirección completa
        </a>
      </div>
    `,
    simpleMode: true // Nueva propiedad para modo simplificado
  };

  return (
    <section id="about-us" className="about-section">
      <div className="wave-header">
        <svg viewBox="0 0 1440 320">
          <path
            fill="#fff"
            fillOpacity="1"
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,0H0Z"
          />
        </svg>
      </div>

      <Container className="py-5">
        <div className="text-center mb-5">
          <GiSteeringWheel className="section-icon mb-3" />
          <h2 className="section-title">MULTICAMIONES EXPRESS</h2>
          <p className="section-subtitle">
            <span className="highlight-text">Soluciones confiables</span> en compra y venta de vehículos de alta calidad
          </p>
        </div>

        <Row className="mb-5 align-items-stretch">
          <Col lg={6} className="mb-4 mb-lg-0">
            <div className="about-description h-100">
              <h3 className="about-heading">QUIÉNES SOMOS</h3>
              <p className="about-text">
                Multicamiones Express es una empresa líder en el mercado de compra y venta de vehículos pesados y camiones.
                Nos especializamos en ofrecer soluciones integrales para el transporte de carga, con un portafolio que incluye
                desde camiones usados certificados hasta unidades nuevas de las mejores marcas internacionales.
              </p>
              <p className="about-text">
                Nuestro compromiso es brindar asesoría experta, transparencia en todas las transacciones y el respaldo de una empresa
                con más de 10 años de experiencia en el sector.
              </p>
            </div>
          </Col>

          <Col lg={6}>
            <div className="location-card h-100">
              <h4 className="location-title">
                <FaMapMarkerAlt className="me-2" /> VISÍTANOS
              </h4>
              
              {/* Mapa simplificado */}
              <div className="map-wrapper mt-3" style={{ height: '250px', borderRadius: '8px', overflow: 'hidden' }}>
                <MapComponent {...mapConfig} />
              </div>

              {/* Información de contacto reorganizada */}
              <div className="contact-info mt-4 text-center">
                <p className="mb-2">
                  <FaPhone className="me-2" /> 
                  <a href="tel:+6041234567" className="text-decoration-none">(604) 123 4567</a>
                </p>
                <p className="mb-2">
                  <FaEnvelope className="me-2" /> 
                  <a href="mailto:contacto@multicamionesexpress.com" className="text-decoration-none">
                    contacto@multicamionesexpress.com
                  </a>
                </p>
                <p className="text-muted small mt-2">
                  Carrera 50 2 Sur 189, Medellín
                </p>
              </div>
            </div>
          </Col>
        </Row>

        <div className="text-center mb-4">
          <h3 className="values-heading">NUESTROS PILARES</h3>
          <p className="values-subheading">Lo que nos diferencia en el mercado</p>
        </div>

        <Row className="g-4 justify-content-center">
          {values.map((value, index) => (
            <Col xl={3} lg={6} md={6} xs={12} key={index}>
              <div className="value-card h-100">
                <div className="card-body text-center p-4">
                  <div className="value-icon-container mb-3">{value.icon}</div>
                  <h3 className="value-title">{value.title}</h3>
                  <p className="value-description">{value.description}</p>
                </div>
                <div className="value-overlay">
                  <div className="overlay-content">
                    <h4>{value.overlay.title}</h4>
                    <p>{value.overlay.content}</p>
                    <button className="btn btn-light overlay-btn">
                      {value.overlay.button} <i className="ms-2 fas fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        <div className="text-center mt-5 pt-3">
          <button
            className="btn btn-primary btn-lg cta-button"
            onClick={handleInventoryClick}
          >
            CONSULTA NUESTRO INVENTARIO <i className="ms-2 fas fa-truck-moving"></i>
          </button>
        </div>
      </Container>
    </section>
  );
};

export default AboutUs;