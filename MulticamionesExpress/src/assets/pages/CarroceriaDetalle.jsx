import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CarroceriaDetalle.css';

const CarroceriaDetalle = () => {
  const { id } = useParams();
  const [carroceria, setCarroceria] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [zoomImg, setZoomImg] = useState('');

  // Datos de ejemplo (en un caso real, estos vendrían de una API)
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
        '/img/carroceria-refrigerada-1.jpg',
        '/img/carroceria-refrigerada-2.jpg',
        '/img/carroceria-refrigerada-3.jpg',
        '/img/carroceria-refrigerada-4.jpg'
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
    { 
      id: 2, 
      tipo: 'Estaca', 
      material: 'Acero', 
      modelo: 'EST-300', 
      ubicacion: 'Medellín',
      precio: 45000000,
      año: 2020,
      estado: 'Usada',
      destacado: false,
      descripcion: 'Carrocería tipo estaca en acero, excelente estado. Ideal para transporte de materiales de construcción, maquinaria y carga pesada. Revisada completamente y lista para trabajar.',
      imagenes: [
        '/img/carroceria-estaca-1.jpg',
        '/img/carroceria-estaca-2.jpg',
        '/img/carroceria-estaca-3.jpg'
      ],
      video: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
      especificaciones: {
        capacidad: '15 toneladas',
        peso: '2,200 kg',
        dimensiones: '7.2m x 2.4m x 2.5m',
        extras: 'Barandas laterales removibles, Piso de madera tratada',
        garantia: '6 meses',
        fabricante: 'Industrias Metálicas del Norte'
      },
      caracteristicas: [
        'Estructura reforzada en acero al carbono',
        'Barandas de 1.20m de altura',
        'Pintura epóxica anticorrosiva',
        'Sistema de amarre con argollas cada 50cm',
        'Frenos de aire comprimido'
      ]
    },
    { 
      id: 3, 
      tipo: 'Cisterna', 
      material: 'Acero inoxidable', 
      modelo: 'CIS-800', 
      ubicacion: 'Cali',
      precio: 120000000,
      año: 2023,
      estado: 'Nueva',
      destacado: true,
      descripcion: 'Cisterna para transporte de líquidos alimenticios, capacidad 30.000 litros. Fabricada en acero inoxidable grado alimenticio, perfecta para transporte de leche, jugos, vinos y otros líquidos comestibles.',
      imagenes: [
        '/img/carroceria-cisterna-1.jpg',
        '/img/carroceria-cisterna-2.jpg',
        '/img/carroceria-cisterna-3.jpg',
        '/img/carroceria-cisterna-4.jpg',
        '/img/carroceria-cisterna-5.jpg'
      ],
      video: 'https://www.youtube.com/watch?v=JGwWNGJdvx8',
      especificaciones: {
        capacidad: '30,000 litros',
        peso: '3,800 kg',
        dimensiones: '8.5m x 2.5m x 3.2m',
        presion: '3.5 bar',
        certificaciones: 'FDA, ISO 9001',
        garantia: '3 años',
        fabricante: 'TankMasters Internacional'
      },
      caracteristicas: [
        'Acero inoxidable AISI 304',
        'Sistema de limpieza CIP integrado',
        'Compartmentos separados',
        'Bomba de transferencia incluida',
        'Sistema de medición de nivel digital'
      ]
    }
  ];

  useEffect(() => {
    // Simular carga de datos
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
    
    const patterns = [
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i,
      /^([a-zA-Z0-9_-]{11})$/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    
    return null;
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
          <p className="mt-3">Cargando detalles del vehículo...</p>
        </div>
      </div>
    );
  }

  if (!carroceria) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center">
          <h4>Vehículo no encontrado</h4>
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
      {/* Modal para zoom de imágenes */}
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
                      <Link to="/carrocerias">Carrocerías</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      {carroceria.tipo} {carroceria.modelo}
                    </li>
                  </ol>
                </nav>

                <h1 className="display-5 fw-bold mb-3">
                  {carroceria.tipo} {carroceria.modelo} ({carroceria.año})
                </h1>

                <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
                  <span className="badge bg-primary fs-6">
                    {carroceria.material}
                  </span>
                  <span className={`badge fs-6 bg-${
                    carroceria.estado === 'Nueva' ? 'success' : 
                    carroceria.estado === 'Reacondicionada' ? 'info' : 
                    carroceria.estado === 'Vendida' ? 'danger' : 'warning'
                  }`}>
                    {carroceria.estado.toUpperCase()}
                  </span>
                  {carroceria.destacado && (
                    <span className="badge bg-warning text-dark fs-6">
                      ⭐ DESTACADO
                    </span>
                  )}
                </div>

                <div className="price-display mb-4">
                  <h2 className="text-danger fw-bold">
                    {formatPrice(carroceria.precio)}
                  </h2>
                  <small className="text-muted">Precio final (IVA incluido)</small>
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

                  <div className="thumbnail-container mt-3">
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

                {videoId && (
                  <div className="video-container mb-4">
                    <h3 className="h5 mb-3">
                      <i className="bi bi-play-circle-fill text-danger me-2"></i>
                      Video demostrativo
                    </h3>
                    <div className="ratio ratio-16x9">
                      <iframe 
                        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                        title={`Video demostrativo de ${carroceria.tipo} ${carroceria.modelo}`}
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
                  <p className="lead">{carroceria.descripcion}</p>
                </div>

                <div className="specs-section mb-4">
                  <h3 className="h5 mb-3">
                    <i className="bi bi-list-check text-primary me-2"></i>
                    Características principales
                  </h3>
                  <ul className="list-group list-group-flush">
                    {carroceria.caracteristicas.map((item, index) => (
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
                      {Object.entries(carroceria.especificaciones).map(([key, value]) => (
                        <tr key={key}>
                          <th className="text-muted">{key.charAt(0).toUpperCase() + key.slice(1)}:</th>
                          <td className="fw-bold">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="d-grid gap-2 mt-4">
                  <button className="btn btn-primary btn-lg">
                    <i className="bi bi-whatsapp me-2"></i>
                    Consultar por WhatsApp
                  </button>
                  <button className="btn btn-outline-primary btn-lg">
                    <i className="bi bi-telephone me-2"></i>
                    Llamar ahora
                  </button>
                  <button className="btn btn-success btn-lg">
                    <i className="bi bi-credit-card me-2"></i>
                    Solicitar financiación
                  </button>
                  <Link to="/carrocerias" className="btn btn-outline-secondary btn-lg">
                    <i className="bi bi-arrow-left me-2"></i>
                    Volver al catálogo
                  </Link>
                </div>

                <div className="alert alert-info mt-4">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-geo-alt-fill fs-4 me-3"></i>
                    <div>
                      <h4 className="h6 mb-1">Ubicación</h4>
                      <p className="mb-0">{carroceria.ubicacion}</p>
                    </div>
                  </div>
                </div>

                <div className="alert alert-warning mt-3">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-clock-history fs-4 me-3"></i>
                    <div>
                      <h4 className="h6 mb-1">Disponibilidad</h4>
                      <p className="mb-0">
                        {carroceria.estado === 'Vendida' 
                          ? 'Este producto ya ha sido vendido' 
                          : 'Disponible para entrega inmediata'}
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