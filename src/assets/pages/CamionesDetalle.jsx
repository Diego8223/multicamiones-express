import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './CamionesDetalle.css';

const CamionDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [camion, setCamion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [zoomImg, setZoomImg] = useState('');

  // Datos de ejemplo
  const camiones = [
    { 
      id: 1, 
      marca: 'Volvo', 
      tipo: 'Tractocamión', 
      modelo: 'FH16', 
      ubicacion: 'Medellín, Colombia',
      precio: 420000000,
      kilometraje: 145000,
      año: 2020,
      estado: 'usado',
      destacado: true,
      descripcion: 'Tractocamión en excelente estado con mantenimiento al día, ideal para transporte pesado. Incluye todos los servicios recientes y documentación al día. Equipado con las últimas tecnologías en seguridad y confort para el conductor.',
      imagenes: [
        '/img/camion1.jpg',
        '/img/camion2.jpg',
        '/img/camion3.jpg',
        '/img/volvo-fh16-4.jpg'
      ],
      video: 'https://www.youtube.com/watch?v=tbI9FW3drWY',
      especificaciones: {
        'Motor': 'D13K 540HP Euro 5',
        'Transmisión': 'I-Shift 12 velocidades',
        'Capacidad de carga': '40 toneladas',
        'Ejes': '3 ejes',
        'Suspensión': 'Neumática',
        'Consumo combustible': '2.5 km/l (promedio)',
        'Altura cabina': '3.9 metros',
        'Peso bruto': '18,000 kg',
        'Extras': 'Cabina Globetrotter XL, Aire acondicionado digital, Dirección asistida, Cámara de retroceso, Sistema de navegación GPS'
      },
      caracteristicas: [
        'Motor Euro 5 con bajo consumo de combustible y emisiones reducidas',
        'Sistema de frenado ABS y EBS con control electrónico',
        'Asientos ergonómicos con ajuste múltiple y calefacción',
        'Sistema de navegación integrado con pantalla táctil de 10"',
        'Control de estabilidad (ESP) y control de descenso en pendientes',
        'Sistema de monitoreo de presión de llantas (TPMS)',
        'Sistema de entretenimiento con Bluetooth y USB',
        'Caja de cambios automatizada para mayor comodidad',
        'Faros LED de largo alcance con autoajuste'
      ],
      garantia: '6 meses o 50,000 km',
      contacto: {
        nombre: 'Juan Pérez',
        telefono: '+57 310 123 4567',
        email: 'ventas@multicamiones.com',
        horario: 'Lunes a Viernes: 8:00 AM - 6:00 PM / Sábados: 9:00 AM - 2:00 PM'
      }
    },
    // ... otros camiones
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      const foundCamion = camiones.find(c => c.id === parseInt(id));
      setCamion(foundCamion);
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

  const getIdFromUrl = (url) => {
    if (!url) return null;
    const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
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
          <p className="mt-3">Cargando detalles del camión...</p>
        </div>
      </div>
    );
  }

  if (!camion) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center">
          <h4>Camion no encontrado</h4>
          <p>El camión solicitado no existe o no está disponible.</p>
          <Link to="/camiones" className="btn btn-primary mt-3">
            Volver al catálogo
          </Link>
        </div>
      </div>
    );
  }

  const videoId = getIdFromUrl(camion.video);

  return (
    <div className="camion-detalle">
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
                      <Link to="/camiones">Camiones</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      {camion.marca} {camion.modelo}
                    </li>
                  </ol>
                </nav>

                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
                  <div>
                    <h1 className="h2 fw-bold mb-2 text-primary">
                      {camion.marca} {camion.modelo} <span className="text-muted">({camion.año})</span>
                    </h1>
                    <div className="d-flex flex-wrap gap-2">
                      <span className="badge bg-primary px-3 py-2">
                        <i className="bi bi-truck me-1"></i> {camion.tipo}
                      </span>
                      <span className={`badge px-3 py-2 ${camion.estado === 'nuevo' ? 'bg-success' : 
                        camion.estado === 'vendido' ? 'bg-danger' : 'bg-warning text-dark'}`}>
                        {camion.estado.toUpperCase()}
                      </span>
                      {camion.destacado && (
                        <span className="badge bg-warning text-dark px-3 py-2">
                          ⭐ DESTACADO
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 mt-md-0 text-center text-md-end">
                    <h2 className="text-danger fw-bold mb-1">
                      {formatPrice(camion.precio)}
                    </h2>
                    <div className="d-flex flex-column flex-md-row gap-2 gap-md-3">
                      <small className="text-muted">
                        <i className="bi bi-speedometer2 me-1"></i>
                        {camion.kilometraje.toLocaleString()} km
                      </small>
                      <small className="text-muted">
                        <i className="bi bi-geo-alt me-1"></i>
                        {camion.ubicacion}
                      </small>
                    </div>
                  </div>
                </div>

                <div className="main-carousel mb-4">
                  <Carousel activeIndex={activeIndex} onSelect={handleSelect} interval={null}>
                    {camion.imagenes.map((img, index) => (
                      <Carousel.Item key={index}>
                        <div 
                          className="main-image-container"
                          onClick={() => handleZoom(img)}
                        >
                          <img
                            className="d-block w-100"
                            src={img}
                            alt={`${camion.marca} ${camion.modelo} - Imagen ${index + 1}`}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/img/default-truck.jpg';
                            }}
                          />
                        </div>
                      </Carousel.Item>
                    ))}
                  </Carousel>

                  <div className="thumbnail-scroll-container">
                    <div className="thumbnail-container">
                      {camion.imagenes.map((img, index) => (
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
                        title={`Video demostrativo ${camion.marca} ${camion.modelo}`}
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
                  <p className="mb-0 fs-5">{camion.descripcion}</p>
                </div>

                <div className="specs-section">
                  <div className="d-flex align-items-center mb-3">
                    <i className="bi bi-list-check text-primary fs-3 me-2"></i>
                    <h3 className="h4 mb-0">Características principales</h3>
                  </div>
                  <ul className="list-group list-group-flush">
                    {camion.caracteristicas.map((item, index) => (
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
                    {Object.entries(camion.especificaciones).map(([key, value]) => (
                      <div key={key} className="spec-grid-item">
                        <div className="spec-grid-key">
                          <span className="fw-bold">{key}</span>
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
                    <a 
                      href={`https://wa.me/57${camion.contacto.telefono.replace(/\D/g, '')}?text=Hola, estoy interesado en el camión ${camion.marca} ${camion.modelo} (ID: ${camion.id})`} 
                      className="btn btn-success py-3 fs-5 fw-bold d-flex align-items-center justify-content-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="bi bi-whatsapp fs-4 me-2"></i>
                      WhatsApp
                    </a>
                    <a 
                      href={`tel:${camion.contacto.telefono}`} 
                      className="btn btn-outline-success py-3 fs-5 fw-bold d-flex align-items-center justify-content-center"
                    >
                      <i className="bi bi-telephone fs-4 me-2"></i>
                      Llamar ahora
                    </a>
                    <button className="btn btn-primary py-3 fs-5 fw-bold d-flex align-items-center justify-content-center">
                      <i className="bi bi-credit-card fs-4 me-2"></i>
                      Financiación
                    </button>
                  </div>

                  <div className="contact-details mb-4">
                    <div className="d-flex align-items-start mb-3">
                      <div className="icon-container bg-light text-dark rounded-circle me-3">
                        <i className="bi bi-person fs-5"></i>
                      </div>
                      <div>
                        <h4 className="h6 fw-bold mb-1">Vendedor</h4>
                        <p className="mb-0 fs-5">{camion.contacto.nombre}</p>
                      </div>
                    </div>

                    <div className="d-flex align-items-start mb-3">
                      <div className="icon-container bg-light text-dark rounded-circle me-3">
                        <i className="bi bi-clock fs-5"></i>
                      </div>
                      <div>
                        <h4 className="h6 fw-bold mb-1">Horario de atención</h4>
                        <p className="mb-0 fs-5">{camion.contacto.horario}</p>
                      </div>
                    </div>

                    <div className="d-flex align-items-start mb-3">
                      <div className="icon-container bg-light text-dark rounded-circle me-3">
                        <i className="bi bi-shield-check fs-5"></i>
                      </div>
                      <div>
                        <h4 className="h6 fw-bold mb-1">Garantía</h4>
                        <p className="mb-0 fs-5 text-success fw-bold">{camion.garantia || 'Sin garantía'}</p>
                      </div>
                    </div>

                    <div className="d-flex align-items-start">
                      <div className="icon-container bg-light text-dark rounded-circle me-3">
                        <i className="bi bi-geo-alt fs-5"></i>
                      </div>
                      <div>
                        <h4 className="h6 fw-bold mb-1">Ubicación</h4>
                        <p className="mb-0 fs-5">
                          <i className="bi bi-pin-map-fill text-danger me-1"></i>
                          {camion.ubicacion}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="alert alert-info mb-0">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-info-circle fs-4 me-2"></i>
                      <p className="mb-0 fs-5">
                        ¿Tienes dudas? Contáctanos y con gusto te asesoraremos sobre este vehículo.
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

export default CamionDetalle;