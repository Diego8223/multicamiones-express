import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './CarroceriaDetalle.css';

const CarroceriaDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [carroceria, setCarroceria] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [zoomImg, setZoomImg] = useState('');

  // Datos de ejemplo
  const carrocerias = [
    { 
      id: 1, 
      tipo: 'Refrigerada', 
      material: 'Aluminio', 
      modelo: 'CRF-450', 
      ubicacion: 'Bogotá',
      precio: 85000000,
      año: 2022,
      estado: 'Nueva',
      destacado: true,
      descripcion: 'Carrocería refrigerada para transporte de alimentos, capacidad 20m3. Fabricada con los más altos estándares de calidad, ideal para transporte de productos perecederos. Sistema de refrigeración de última generación con control digital de temperatura.',
      imagenes: [
        '/img/carroceria-refrigerada-1.webp',
        '/img/carroceria-refrigerada-2.webp',
        '/img/carroceria-refrigerada-3.webp',
        '/img/carroceria-refrigerada-4.webp'
      ],
      video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      especificaciones: {
        capacidad: '20 m³',
        peso: '1,500 kg',
        dimensiones: '6.5m x 2.5m x 2.4m',
        temperatura: '-20°C a +10°C',
        extras: 'Sistema de monitoreo GPS, Puerta trasera elevadora',
        garantia: '2 años',
        fabricante: 'Carrocerías Premium S.A.'
      },
      caracteristicas: [
        'Aislamiento térmico de 60mm de espesor',
        'Piso antideslizante de aluminio',
        'Puertas laterales corredizas',
        'Sistema de iluminación LED interior',
        'Cierre hermético para máxima eficiencia energética'
      ]
    },
    // ... otros ejemplos de carrocerías
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      const foundCarroceria = carrocerias.find(c => c.id === parseInt(id));
      setCarroceria(foundCarroceria);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  const handleZoom = (img) => {
    setZoomImg(img);
    setZoom(true);
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3">Cargando detalles de la carrocería...</p>
        </div>
      </div>
    );
  }

  if (!carroceria) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center">
          <h4>Carrocería no encontrada</h4>
          <p>La carrocería solicitada no existe o no está disponible.</p>
          <Link to="/carrocerias" className="btn btn-primary mt-3">
            Volver al catálogo
          </Link>
        </div>
      </div>
    );
  }

  const videoId = getYouTubeId(carroceria.video);

  return (
    <div className="carroceria-detalle">
      {zoom && (
        <div className="image-zoom-modal" onClick={() => setZoom(false)}>
          <div className="zoom-content">
            <img src={zoomImg} alt="Zoom" className="zoomed-image" />
            <button 
              className="btn btn-danger zoom-close-btn"
              onClick={(e) => {
                e.stopPropagation();
                setZoom(false);
              }}
            >
              &times;
            </button>
          </div>
        </div>
      )}

      <div className="container-fluid px-0 px-md-3 py-3 py-md-4">
        {/* Botón de retorno en la parte superior */}
        <div className="d-flex justify-content-start mb-3 mb-md-4 ps-3 ps-md-0">
          <button 
            onClick={() => navigate(-1)}
            className="btn btn-outline-primary d-flex align-items-center"
          >
            <i className="bi bi-arrow-left me-2 fs-5"></i>
            <span className="fs-5">Volver al listado</span>
          </button>
        </div>

        <div className="row g-0 g-md-3">
          <div className="col-lg-8 mb-3 mb-lg-0 pe-0 pe-md-3">
            <div className="card shadow-sm h-100 border-0">
              <div className="card-body p-3 p-md-4">
                <nav aria-label="breadcrumb" className="d-none d-md-block mb-4">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/">Inicio</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link to="/carrocerias">Carrocerías</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      {carroceria.tipo} {carroceria.modelo}
                    </li>
                  </ol>
                </nav>

                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
                  <div>
                    <h1 className="h2 fw-bold mb-2 text-primary">
                      {carroceria.tipo} {carroceria.modelo} <span className="text-muted">({carroceria.año})</span>
                    </h1>
                    <div className="d-flex flex-wrap gap-2">
                      <span className="badge bg-primary px-3 py-2">
                        <i className="bi bi-box-seam me-1"></i> {carroceria.material}
                      </span>
                      <span className={`badge px-3 py-2 ${
                        carroceria.estado === 'Nueva' ? 'bg-success' : 
                        carroceria.estado === 'Reacondicionada' ? 'bg-info' : 
                        carroceria.estado === 'Vendida' ? 'bg-danger' : 'bg-warning text-dark'
                      }`}>
                        {carroceria.estado.toUpperCase()}
                      </span>
                      {carroceria.destacado && (
                        <span className="badge bg-warning text-dark px-3 py-2">
                          ⭐ DESTACADO
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 mt-md-0 text-center text-md-end">
                    <h2 className="text-danger fw-bold mb-1">
                      {formatPrice(carroceria.precio)}
                    </h2>
                    <small className="text-muted">Precio final (IVA incluido)</small>
                  </div>
                </div>

                <div className="main-carousel mb-4">
                  <Carousel activeIndex={activeIndex} onSelect={handleSelect} interval={null}>
                    {carroceria.imagenes.map((img, index) => (
                      <Carousel.Item key={index}>
                        <div 
                          className="main-image-container"
                          onClick={() => handleZoom(img)}
                        >
                          <img
                            className="d-block w-100"
                            src={img}
                            alt={`${carroceria.tipo} ${carroceria.modelo} - Imagen ${index + 1}`}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/img/default-carroceria.jpg';
                            }}
                          />
                        </div>
                      </Carousel.Item>
                    ))}
                  </Carousel>

                  <div className="thumbnail-scroll-container">
                    <div className="thumbnail-container">
                      {carroceria.imagenes.map((img, index) => (
                        <div 
                          key={index}
                          className={`thumbnail ${activeIndex === index ? 'active' : ''}`}
                          onClick={() => setActiveIndex(index)}
                        >
                          <img
                            src={img}
                            alt={`Miniatura ${index + 1}`}
                            className="img-thumbnail"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {videoId && (
                  <div className="video-container mb-4">
                    <div className="d-flex align-items-center mb-3">
                      <i className="bi bi-play-circle-fill text-danger fs-3 me-2"></i>
                      <h3 className="h4 mb-0">Video demostrativo</h3>
                    </div>
                    <div className="ratio ratio-16x9">
                      <iframe 
                        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                        title={`Video demostrativo ${carroceria.tipo} ${carroceria.modelo}`}
                        allowFullScreen
                        loading="lazy"
                        className="rounded"
                        style={{ border: 'none' }}
                      ></iframe>
                    </div>
                  </div>
                )}

                <div className="description-section mb-4">
                  <div className="d-flex align-items-center mb-3">
                    <i className="bi bi-card-text text-primary fs-3 me-2"></i>
                    <h3 className="h4 mb-0">Descripción detallada</h3>
                  </div>
                  <p className="mb-0 fs-5">{carroceria.descripcion}</p>
                </div>

                <div className="specs-section">
                  <div className="d-flex align-items-center mb-3">
                    <i className="bi bi-list-check text-primary fs-3 me-2"></i>
                    <h3 className="h4 mb-0">Características principales</h3>
                  </div>
                  <ul className="list-group list-group-flush">
                    {carroceria.caracteristicas.map((item, index) => (
                      <li key={index} className="list-group-item d-flex align-items-start py-3">
                        <i className="bi bi-check-circle-fill text-success mt-1 me-3 fs-5"></i>
                        <span className="fs-5">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 ps-0 ps-md-3">
            <div className="card shadow-sm h-100 border-0 sticky-lg-top" style={{ top: '20px' }}>
              <div className="card-body p-0">
                {/* Sección de Especificaciones Técnicas - Versión Mejorada */}
                <div className="p-3 p-md-4 border-bottom">
                  <div className="d-flex align-items-center mb-4">
                    <div className="icon-container bg-primary text-white rounded-circle me-3">
                      <i className="bi bi-gear-fill fs-4"></i>
                    </div>
                    <h3 className="h4 mb-0 text-primary fw-bold">Especificaciones Técnicas</h3>
                  </div>

                  <div className="specs-grid">
                    {Object.entries(carroceria.especificaciones).map(([key, value]) => (
                      <div key={key} className="spec-grid-item">
                        <div className="spec-grid-key">
                          <span className="fw-bold">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                        </div>
                        <div className="spec-grid-value">
                          <span>{value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sección de Contacto */}
                <div className="p-3 p-md-4">
                  {/* Botón de retorno adicional en móviles */}
                  <div className="d-block d-lg-none mb-4">
                    <button 
                      onClick={() => navigate(-1)}
                      className="btn btn-outline-primary w-100 py-2 d-flex align-items-center justify-content-center"
                    >
                      <i className="bi bi-arrow-left me-2"></i>
                      Volver al listado
                    </button>
                  </div>

                  <div className="d-flex align-items-center mb-4">
                    <div className="icon-container bg-success text-white rounded-circle me-3">
                      <i className="bi bi-headset fs-4"></i>
                    </div>
                    <h3 className="h4 mb-0 text-success fw-bold">Contacto y Garantía</h3>
                  </div>

                  <div className="d-grid gap-3 mb-4">
                    <button className="btn btn-success py-3 fs-5 fw-bold d-flex align-items-center justify-content-center">
                      <i className="bi bi-whatsapp fs-4 me-2"></i>
                      WhatsApp
                    </button>
                    <button className="btn btn-outline-success py-3 fs-5 fw-bold d-flex align-items-center justify-content-center">
                      <i className="bi bi-telephone fs-4 me-2"></i>
                      Llamar ahora
                    </button>
                    <button className="btn btn-primary py-3 fs-5 fw-bold d-flex align-items-center justify-content-center">
                      <i className="bi bi-credit-card fs-4 me-2"></i>
                      Financiación
                    </button>
                  </div>

                  <div className="contact-details mb-4">
                    <div className="d-flex align-items-start mb-3">
                      <div className="icon-container bg-light text-dark rounded-circle me-3">
                        <i className="bi bi-geo-alt fs-5"></i>
                      </div>
                      <div>
                        <h4 className="h6 fw-bold mb-1">Ubicación</h4>
                        <p className="mb-0 fs-5">
                          <i className="bi bi-pin-map-fill text-danger me-1"></i>
                          {carroceria.ubicacion}
                        </p>
                      </div>
                    </div>

                    <div className="d-flex align-items-start mb-3">
                      <div className="icon-container bg-light text-dark rounded-circle me-3">
                        <i className="bi bi-shield-check fs-5"></i>
                      </div>
                      <div>
                        <h4 className="h6 fw-bold mb-1">Garantía</h4>
                        <p className="mb-0 fs-5 text-success fw-bold">
                          {carroceria.especificaciones.garantia || 'Sin garantía'}
                        </p>
                      </div>
                    </div>

                    <div className="d-flex align-items-start">
                      <div className="icon-container bg-light text-dark rounded-circle me-3">
                        <i className="bi bi-clock-history fs-5"></i>
                      </div>
                      <div>
                        <h4 className="h6 fw-bold mb-1">Disponibilidad</h4>
                        <p className="mb-0 fs-5">
                          {carroceria.estado === 'Vendida' 
                            ? 'Este producto ya ha sido vendido' 
                            : 'Disponible para entrega inmediata'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="alert alert-info mb-0">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-info-circle fs-4 me-2"></i>
                      <p className="mb-0 fs-5">
                        ¿Tienes dudas? Contáctanos y con gusto te asesoraremos sobre este producto.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarroceriaDetalle;