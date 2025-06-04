import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './CamionesDetalle.css';

const CamionDetalle = () => {
  const { id } = useParams();
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
      ubicacion: 'Medellín',
      precio: 420000000,
      kilometraje: 145000,
      año: 2020,
      estado: 'usado',
      destacado: true,
      descripcion: 'Tractocamión en excelente estado con mantenimiento al día, ideal para transporte pesado. Incluye todos los servicios recientes y documentación al día.',
      imagenes: [
        '/img/camion1.jpg',
        '/img/camion2.jpg',
        '/img/camion3.jpg',
        '/img/volvo-fh16-4.jpg'
      ],
      video: 'https://www.youtube.com/watch?v=tbI9FW3drWY',
      especificaciones: {
        motor: 'D13K 540HP',
        transmision: 'I-Shift 12 velocidades',
        capacidad: '40 toneladas',
        ejes: '3',
        suspension: 'Neumática',
        'Consumo combustible': '2.5 km/l',
        'Altura cabina': '3.9 m',
        'Peso bruto': '18,000 kg',
        extras: 'Cabina Globetrotter, Aire acondicionado, Dirección asistida, Camara de retroceso'
      },
      caracteristicas: [
        'Motor Euro 5 con bajo consumo de combustible',
        'Sistema de frenado ABS y EBS',
        'Asientos ergonómicos con ajuste múltiple',
        'Sistema de navegación integrado',
        'Control de estabilidad (ESP)',
        'Sistema de monitoreo de presión de llantas'
      ],
      garantia: '6 meses',
      contacto: {
        nombre: 'Juan Pérez',
        telefono: '+57 310 123 4567',
        email: 'ventas@multicamiones.com'
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

      <div className="container py-5">
        <div className="row">
          <div className="col-lg-8">
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <nav aria-label="breadcrumb">
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

                <h1 className="display-5 fw-bold mb-3">
                  {camion.marca} {camion.modelo} ({camion.año})
                </h1>

                <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
                  <span className="badge bg-primary fs-6">
                    {camion.tipo}
                  </span>
                  <span className={`badge fs-6 bg-${
                    camion.estado === 'nuevo' ? 'success' : 
                    camion.estado === 'vendido' ? 'danger' : 'warning'
                  }`}>
                    {camion.estado.toUpperCase()}
                  </span>
                  {camion.destacado && (
                    <span className="badge bg-warning text-dark fs-6">
                      ⭐ DESTACADO
                    </span>
                  )}
                </div>

                <div className="price-display mb-4">
                  <h2 className="text-danger fw-bold">
                    {formatPrice(camion.precio)}
                  </h2>
                  <div className="d-flex justify-content-between">
                    <small className="text-muted">Kilometraje: {camion.kilometraje.toLocaleString()} km</small>
                    <small className="text-muted">Ubicación: {camion.ubicacion}</small>
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

                  <div className="thumbnail-container mt-3">
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

                {videoId && (
                  <div className="video-container mb-4">
                    <h3 className="h5 mb-3">
                      <i className="bi bi-play-circle-fill text-danger me-2"></i>
                      Video demostrativo
                    </h3>
                    <div className="ratio ratio-16x9">
                      <iframe 
                        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                        title={`Video demostrativo ${camion.marca} ${camion.modelo}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                        className="rounded"
                        style={{ border: 'none' }}
                        referrerPolicy="strict-origin-when-cross-origin"
                      ></iframe>
                    </div>
                  </div>
                )}

                <div className="description-section mb-4">
                  <h3 className="h5 mb-3">
                    <i className="bi bi-card-text text-primary me-2"></i>
                    Descripción detallada
                  </h3>
                  <p className="lead">{camion.descripcion}</p>
                </div>

                <div className="specs-section mb-4">
                  <h3 className="h5 mb-3">
                    <i className="bi bi-list-check text-primary me-2"></i>
                    Características principales
                  </h3>
                  <ul className="list-group list-group-flush">
                    {camion.caracteristicas.map((item, index) => (
                      <li key={index} className="list-group-item">
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card shadow-sm sticky-top mb-4" style={{ top: '20px' }}>
              <div className="card-body">
                <h3 className="h5 mb-4 text-center">
                  <i className="bi bi-info-circle-fill text-primary me-2"></i>
                  Especificaciones técnicas
                </h3>

                <div className="specs-table">
                  <table className="table table-borderless">
                    <tbody>
                      {Object.entries(camion.especificaciones).map(([key, value]) => (
                        <tr key={key}>
                          <th className="text-muted">{key}:</th>
                          <td className="fw-bold">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="d-grid gap-2 mt-4">
                  <a 
                    href={`https://wa.me/57${camion.contacto.telefono.replace(/\D/g, '')}?text=Hola, estoy interesado en el camión ${camion.marca} ${camion.modelo} (ID: ${camion.id})`} 
                    className="btn btn-primary btn-lg"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="bi bi-whatsapp me-2"></i>
                    Consultar por WhatsApp
                  </a>
                  <a 
                    href={`tel:${camion.contacto.telefono}`} 
                    className="btn btn-outline-primary btn-lg"
                  >
                    <i className="bi bi-telephone me-2"></i>
                    Llamar ahora
                  </a>
                  <button className="btn btn-success btn-lg">
                    <i className="bi bi-credit-card me-2"></i>
                    Solicitar financiación
                  </button>
                  <Link to="/camiones" className="btn btn-outline-secondary btn-lg">
                    <i className="bi bi-arrow-left me-2"></i>
                    Volver al catálogo
                  </Link>
                </div>

                <div className="alert alert-info mt-4">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-geo-alt-fill fs-4 me-3"></i>
                    <div>
                      <h4 className="h6 mb-1">Ubicación</h4>
                      <p className="mb-0">{camion.ubicacion}</p>
                    </div>
                  </div>
                </div>

                <div className="alert alert-warning mt-3">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-shield-check fs-4 me-3"></i>
                    <div>
                      <h4 className="h6 mb-1">Garantía</h4>
                      <p className="mb-0">
                        {camion.garantia || 'Sin garantía'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="alert alert-light mt-3">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-person-fill fs-4 me-3"></i>
                    <div>
                      <h4 className="h6 mb-1">Contacto</h4>
                      <p className="mb-1">{camion.contacto.nombre}</p>
                      <p className="mb-1">
                        <a href={`tel:${camion.contacto.telefono}`}>
                          {camion.contacto.telefono}
                        </a>
                      </p>
                      <p className="mb-0">
                        <a href={`mailto:${camion.contacto.email}`}>
                          {camion.contacto.email}
                        </a>
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