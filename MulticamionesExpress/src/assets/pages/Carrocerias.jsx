import React, { useState, useEffect, useMemo } from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import FallbackImage from '../../assets/img/foton.jpg';
import './carrocerias.css';

// Importa imágenes para el carrusel de carrocerías
import Carroceria1 from '../../assets/img/carroceria1.jpg';
import Carroceria2 from '../../assets/img/carroceria2.jpg';
import Carroceria3 from '../../assets/img/carroceria3.jpg';

const Carrocerias = () => {
  // Estados del carrusel
  const [index, setIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [loading, setLoading] = useState(true); // Estado para controlar la carga inicial

  // Configuración de rutas de imágenes locales para carrocerías
  const carouselItems = useMemo(() => [
    {
      image: Carroceria1,
      altText: 'Carrocerías de alta calidad'
    },
    {
      image: Carroceria2,
      altText: 'Variedad de modelos disponibles'
    },
    {
      image: Carroceria3,
      altText: 'Fabricación profesional'
    }
  ], []);

  // Precarga de imágenes
  useEffect(() => {
    let isMounted = true;
    const loadImages = async () => {
      try {
        await Promise.all(
          carouselItems.map(item =>
              new Promise((resolve, reject) => {
                const img = new Image();
                img.src = item.image;
                img.onload = resolve;
                img.onerror = () => reject(`Error loading: ${item.image}`);
              })
          )
        );
      } catch (error) {
          console.error('Error en carga de imágenes:', error);
      } finally {
          if (isMounted) setLoading(false); // Marca como cargado una vez que todas las imágenes han intentado cargar
      }
    };

    loadImages();
    return () => { isMounted = false };
  }, [carouselItems]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    tipo: '',
    material: '',
    estado: '',
    ubicacion: '',
    destacado: false
  });

  // Datos específicos para carrocerías
  const tiposCarroceria = [
    'Estaca', 'Furgón', 'Refrigerada', 'Cisterna',
    'Volqueta', 'Tanque', 'Plataforma', 'Jaula',
    'Cerrada', 'Abierta', 'Especial', 'Contenedor'
  ];

  const materiales = [
    'Acero', 'Aluminio', 'Fibra de vidrio', 'Mixta',
    'Madera', 'Plástico reforzado', 'Acero inoxidable'
  ];

  const ciudadesColombia = [
    'Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena',
    'Bucaramanga', 'Pereira', 'Manizales', 'Cúcuta', 'Ibagué'
  ];

  // Estados de los vehículos
  const Estados = ['Nueva', 'Usada', 'Reacondicionada', 'Vendida'];

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
      descripcion: 'Carrocería refrigerada para transporte de alimentos, capacidad 20m3',
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
        extras: 'Sistema de monitoreo GPS, Puerta trasera elevadora'
      }
    },
    {
      id: 2,
      tipo: 'Estaca',
      material: 'Acero',
      modelo: 'EST-300',
      ubicacion: 'Medellín',
      precio: 45000000,
      año: 2020,
      estado: 'Vendida',
      destacado: false,
      descripcion: 'Carrocería tipo estaca en acero, excelente estado',
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
        extras: 'Barandas laterales removibles, Piso de madera tratada'
      }
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
      descripcion: 'Cisterna para transporte de líquidos alimenticios, capacidad 30.000 litros',
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
        certificaciones: 'FDA, ISO 9001'
      }
    }
  ];

  // Función mejorada para extraer IDs de YouTube
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

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const filteredCarrocerias = carrocerias.filter(carroceria => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = (
      carroceria.tipo.toLowerCase().includes(searchLower) ||
      carroceria.modelo.toLowerCase().includes(searchLower) ||
      carroceria.descripcion.toLowerCase().includes(searchLower) ||
      carroceria.material.toLowerCase().includes(searchLower)
    );

    const matchesFilters = (
      (!filters.tipo || carroceria.tipo === filters.tipo) &&
      (!filters.material || carroceria.material === filters.material) &&
      (!filters.ubicacion || carroceria.ubicacion === filters.ubicacion) &&
      (!filters.estado || carroceria.estado === filters.estado) &&
      (!filters.destacado || carroceria.destacado === filters.destacado)
    );

    return matchesSearch && matchesFilters;
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Función para contar carrocerías por propiedad
  const countBy = (prop) => {
    return carrocerias.reduce((acc, curr) => {
      const key = curr[prop]?.toString() || 'desconocido';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
  };

  const conteoEstados = countBy('estado');
  const conteoTipos = countBy('tipo');
  const conteoMateriales = countBy('material');
  const conteoUbicaciones = countBy('ubicacion');
  const conteoDestacados = carrocerias.filter(c => c.destacado).length;

  return (
    <div className="carrocerias-container">
      {/* Carrusel */}
      <Carousel
        activeIndex={index}
        onSelect={setIndex}
        fade
        pause={autoPlay ? false : 'hover'}
        className="main-carousel"
        interval={autoPlay ? 5000 : null}
        onMouseEnter={() => setAutoPlay(false)}
        onMouseLeave={() => setAutoPlay(true)}
      >
        {carouselItems.map((item, idx) => (
          <Carousel.Item key={idx}>
            <div className="carousel-image-container">
              {/* Se renderiza un cargador esquelético mientras la imagen carga, evitando el parpadeo */}
              {loading ? (
                <div className="skeleton-loader" style={{ height: '700px', width: '100%' }} />
              ) : (
                <img
                  className="d-block w-100"
                  src={item.image}
                  alt={item.altText}
                  loading="eager"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = FallbackImage;
                  }}
                />
              )}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Título de la sección principal (¡Este es el correcto y ya estaba bien posicionado!) */}
      <header
        className="text-center mb-3 mt-5 titulo-carrocerias-wrapper"
      >
        <h1 className="titulo-carrocerias mb-5">
          CARROCERIAS NUEVAS Y USADAS
        </h1>
      </header>

      {/* Contenido principal de la página */}
      <div className="container-fluid p-4 mt-0 position-relative">
        <div className="container-fluid px-3 px-md-4 mt-0">
          <div className="row justify-content-center">
            <div className="col-12">
              {/*
                ***** INICIO DE LA CORRECCIÓN *****
                Se ha ELIMINADO la etiqueta <header> que envolvía el div de los contadores.
                El título principal ya está arriba, y este header era redundante y podía causar problemas.
              */}
              <div className="contadores-container d-flex flex-wrap justify-content-center gap-2 mb-4">
                <div className="contador-badge">
                  <h5 className="mb-0">Total: {carrocerias.length}</h5>
                </div>
                <div className="contador-badge">
                  <h5 className="mb-0">Nuevas: {conteoEstados['Nueva'] || 0}</h5>
                </div>
                <div className="contador-badge">
                  <h5 className="mb-0">Usadas: {conteoEstados['Usada'] || 0}</h5>
                </div>
                <div className="contador-badge">
                  <h5 className="mb-0">Vendidas: {conteoEstados['Vendida'] || 0}</h5>
                </div>
                <div className="contador-badge">
                  <h5 className="mb-0">Reacondicionadas: {conteoEstados['Reacondicionada'] || 0}</h5>
                </div>
                <div className="contador-badge">
                  <h5 className="mb-0">Destacadas: {conteoDestacados}</h5>
                </div>
              </div>
              {/* ***** FIN DE LA CORRECCIÓN ***** */}
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-12">
              <div className="card shadow-lg mb-5 border-0">
                <div className="card-body">
                  <div className="mb-4">
                    <input
                      type="search"
                      className="form-control form-control-lg"
                      placeholder="🔍 Buscar por tipo, material, modelo o características..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <div className="row g-2 g-md-3">
                    <div className="col-6 col-md-3">
                      <select
                        name="tipo"
                        className="form-select"
                        onChange={handleFilterChange}
                        value={filters.tipo}
                      >
                        <option value="">Todos los tipos ({tiposCarroceria.length})</option>
                        {tiposCarroceria.map(tipo => (
                          <option key={tipo} value={tipo}>
                            {tipo} ({conteoTipos[tipo] || 0})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-6 col-md-3">
                      <select
                        name="material"
                        className="form-select"
                        onChange={handleFilterChange}
                        value={filters.material}
                      >
                        <option value="">Todos los materiales ({materiales.length})</option>
                        {materiales.map(material => (
                          <option key={material} value={material}>
                            {material} ({conteoMateriales[material] || 0})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-6 col-md-3">
                      <select
                        name="ubicacion"
                        className="form-select"
                        onChange={handleFilterChange}
                        value={filters.ubicacion}
                      >
                        <option value="">Todas las ubicaciones ({ciudadesColombia.length})</option>
                        {ciudadesColombia.map(ciudad => (
                          <option key={ciudad} value={ciudad}>
                            {ciudad} ({conteoUbicaciones[ciudad] || 0})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-6 col-md-3">
                      <div className="d-flex flex-column flex-md-row gap-2 align-items-center h-100">
                        <select
                          name="estado"
                          className="form-select"
                          onChange={handleFilterChange}
                          value={filters.estado}
                        >
                          <option value="">Todos los estados</option>
                          {Estados.map(estado => (
                            <option key={estado} value={estado}>
                              {estado} ({conteoEstados[estado] || 0})
                            </option>
                          ))}
                        </select>
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input big-checkbox"
                            id="destacado"
                            name="destacado"
                            checked={filters.destacado}
                            onChange={handleFilterChange}
                          />
                          <label className="form-check-label" htmlFor="destacado">
                            Destacadas
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {filteredCarrocerias.length > 0 ? (
              filteredCarrocerias.map(carroceria => {
                // Ya no necesitamos videoId aquí, pero la función getYouTubeId se mantiene
                // en caso de que la necesites para otras funcionalidades en el futuro.
                // const videoId = getYouTubeId(carroceria.video); 
                
                return (
                  <div key={carroceria.id} className="col">
                    <div className="card h-100 shadow-sm position-relative hover-effect">
                      {carroceria.estado === 'Vendida' && (
                        <div className="sold-overlay">
                          <span className="sold-text">VENDIDA</span>
                        </div>
                      )}
                      
                      {carroceria.destacado && (
                        <div className="ribbon ribbon-top-right">
                          <span>⭐ DESTACADA</span>
                        </div>
                      )}
                      
                      <Link to={`/carrocerias/${carroceria.id}`} className="text-decoration-none">
                        <div id={`carouselCarroceria${carroceria.id}`} className="carousel slide" data-bs-ride="carousel">
                          <div className="carousel-inner ratio ratio-16x9">
                            {carroceria.imagenes.map((img, index) => (
                              <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                <img 
                                  src={img} 
                                  className="d-block w-100"
                                  alt={`${carroceria.tipo} ${carroceria.modelo}`}
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = FallbackImage; // Usa FallbackImage para carrocerías
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                          {carroceria.imagenes.length > 1 && (
                            <>
                              <button className="carousel-control-prev" type="button" data-bs-target={`#carouselCarroceria${carroceria.id}`} data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                              </button>
                              <button className="carousel-control-next" type="button" data-bs-target={`#carouselCarroceria${carroceria.id}`} data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                              </button>
                            </>
                          )}
                        </div>
                      </Link>
                      
                      {/* SE HA ELIMINADO LA SECCIÓN DE VIDEO AQUÍ */}
                      
                      <div className="card-body">
                        <h3 className="card-title fw-bold text-primary">
                          {carroceria.tipo} {carroceria.modelo} ({carroceria.año})
                        </h3>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <span className="h4 text-danger">{formatPrice(carroceria.precio)}</span>
                          <span className="badge bg-dark">Material: {carroceria.material}</span>
                        </div>
                        <p className="card-text text-muted">{carroceria.descripcion}</p>
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item d-flex justify-content-between">
                            <span>Tipo:</span>
                            <strong>{carroceria.tipo}</strong>
                          </li>
                          <li className="list-group-item d-flex justify-content-between">
                            <span>Ubicación:</span>
                            <strong>{carroceria.ubicacion}</strong>
                          </li>
                          <li className="list-group-item d-flex justify-content-between">
                            <span>Estado:</span>
                            <strong className={`badge bg-${carroceria.estado === 'Nueva' ? 'success' : carroceria.estado === 'Vendida' ? 'danger' : carroceria.estado === 'Usada' ? 'warning' : 'info'}`}>
                              {carroceria.estado.toUpperCase()}
                            </strong>
                          </li>
                        </ul>
                        <div className="mt-3">
                          <Link to={`/carrocerias/${carroceria.id}`} className="btn btn-primary w-100">
                            Ver detalles completos
                          </Link>
                        </div>
                      </div>
                    </div>
                    </div>
                );
              })
            ) : (
              <div className="col-12 text-center py-5">
                <p className="lead">No se encontraron carrocerías que coincidan con tu búsqueda.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carrocerias;