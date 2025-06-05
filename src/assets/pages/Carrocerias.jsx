import React, { useState, useEffect, useMemo } from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import FallbackImage from '../../assets/img/foton.jpg';
import './Carrocerias.css';

// Importa imágenes para el carrusel de carrocerías
import Carroceria1 from '../../assets/img/carroceria1.jpg';
import Carroceria2 from '../../assets/img/carroceria2.jpg';
import Carroceria3 from '../../assets/img/carroceria3.jpg';

const Carrocerias = () => {
  // Estados del carrusel
  const [index, setIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Actualizar ancho de ventana al cambiar tamaño
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        if (isMounted) setLoading(false);
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
      estado: 'Usada',
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
    },
    {
      id: 4,
      tipo: 'Volqueta',
      material: 'Acero',
      modelo: 'VOL-650',
      ubicacion: 'Barranquilla',
      precio: 68000000,
      año: 2021,
      estado: 'Usada',
      destacado: false,
      descripcion: 'Carrocería tipo volqueta en acero, buen estado general',
      imagenes: [
        '/img/carroceria-volqueta-1.jpg',
        '/img/carroceria-volqueta-2.jpg'
      ],
      video: 'https://www.youtube.com/watch?v=JGwWNGJdvx8',
      especificaciones: {
        capacidad: '18 toneladas',
        peso: '3,200 kg',
        dimensiones: '7.8m x 2.5m x 2.8m'
      }
    }
  ];

  // Función para contar carrocerías por propiedad
  const countBy = (prop) => {
    return carrocerias.reduce((acc, curr) => {
      const key = curr[prop]?.toString() || 'desconocido';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
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

  const conteoEstados = countBy('estado');
  const conteoTipos = countBy('tipo');
  const conteoMateriales = countBy('material');
  const conteoUbicaciones = countBy('ubicacion');
  const conteoDestacados = carrocerias.filter(c => c.destacado).length;

  // Estilos dinámicos responsive
  const responsiveStyles = {
    containerPadding: windowWidth < 768 ? '0 10px' : '0 20px',
    carouselHeight: windowWidth < 768 ? '200px' : '500px',
    titleSize: windowWidth < 768 ? '1.8rem' : '2.5rem',
    cardTitleSize: windowWidth < 768 ? '1.2rem' : '1.5rem',
    cardTextSize: windowWidth < 768 ? '0.9rem' : '1rem',
    priceSize: windowWidth < 768 ? '1.1rem' : '1.3rem',
    badgeSize: windowWidth < 768 ? '0.7rem' : '0.8rem',
    buttonSize: windowWidth < 768 ? '0.9rem' : '1rem',
    inputSize: windowWidth < 768 ? '0.9rem' : '1rem',
    counterSize: windowWidth < 768 ? '0.9rem' : '1rem',
    noResultsSize: windowWidth < 768 ? '1.1rem' : '1.3rem',
    filterOptionSize: windowWidth < 768 ? '0.8rem' : '0.9rem',
    filterLabelSize: windowWidth < 768 ? '0.9rem' : '1rem'
  };

  // Componente para renderizar filtros agrupados
  const FilterGroup = ({ title, name, options, count }) => (
    <div className="mb-3">
      <h3 className="h6 mb-2" style={{ fontSize: responsiveStyles.filterLabelSize, fontWeight: 'bold' }}>
        {title}
      </h3>
      <select
        name={name}
        className="form-select"
        onChange={handleFilterChange}
        value={filters[name]}
        style={{ fontSize: responsiveStyles.inputSize }}
      >
        <option value="">Todos ({Object.values(count).reduce((a, b) => a + b, 0)})</option>
        {options.map(option => (
          <option 
            key={option} 
            value={option}
            style={{ fontSize: responsiveStyles.filterOptionSize }}
            title={option}
          >
            {windowWidth < 768 ? 
              `${option.substring(0, 12)}${option.length > 12 ? '...' : ''}` : 
              option} ({count[option] || 0})
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="carrocerias-container" style={{ padding: responsiveStyles.containerPadding, marginTop: windowWidth < 768 ? '60px' : '80px' }}>
      {/* Carrusel */}
      <div className="carousel-wrapper" style={{ marginTop: windowWidth < 768 ? '10px' : '20px' }}>
        <Carousel
          activeIndex={index}
          onSelect={setIndex}
          fade
          pause={autoPlay ? false : 'hover'}
          className="main-carousel mb-4"
          interval={autoPlay ? 5000 : null}
          onMouseEnter={() => setAutoPlay(false)}
          onMouseLeave={() => setAutoPlay(true)}
        >
          {carouselItems.map((item, idx) => (
            <Carousel.Item key={idx}>
              <div className="carousel-image-container" style={{ height: responsiveStyles.carouselHeight }}>
                {loading ? (
                  <div className="skeleton-loader" style={{ height: '100%', width: '100%' }} />
                ) : (
                  <img
                    className="d-block w-100 h-100"
                    src={item.image}
                    alt={item.altText}
                    loading="eager"
                    style={{ objectFit: 'cover' }}
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
      </div>

      {/* Título principal */}
      <header className="text-center my-4">
        <h1 className="titulo-carrocerias fw-bold" style={{ fontSize: responsiveStyles.titleSize }}>
          CARROCERÍAS NUEVAS Y USADAS
        </h1>
        <p className="lead" style={{ fontSize: responsiveStyles.cardTextSize }}>
          Encuentra la carrocería perfecta para tus necesidades de transporte
        </p>
      </header>

      {/* Contadores */}
      <div className="contadores-container mb-4">
        <div className="row g-3 justify-content-center">
          {[
            { label: 'Total', value: carrocerias.length, color: 'primary' },
            { label: 'Nuevas', value: conteoEstados['Nueva'] || 0, color: 'success' },
            { label: 'Usadas', value: conteoEstados['Usada'] || 0, color: 'warning' },
            { label: 'Reacondicionadas', value: conteoEstados['Reacondicionada'] || 0, color: 'info' },
            { label: 'Destacadas', value: conteoDestacados, color: 'danger' }
          ].map((item, index) => (
            <div key={index} className="col-6 col-sm-4 col-md-3 col-lg-2">
              <div className={`counter-card bg-${item.color} text-white rounded p-3 text-center shadow`}>
                <div className="counter-value fw-bold" style={{ fontSize: '1.5rem' }}>
                  {item.value}
                </div>
                <div className="counter-label" style={{ fontSize: responsiveStyles.counterSize }}>
                  {item.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filtros - MEJORADO Y ORGANIZADO */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h2 className="h5 mb-3" style={{ fontSize: responsiveStyles.cardTitleSize }}>
            <i className="bi bi-funnel-fill me-2"></i>
            Filtrar Carrocerías
          </h2>
          
          <div className="mb-3">
            <input
              type="search"
              className="form-control"
              placeholder="🔍 Buscar por tipo, modelo o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ fontSize: responsiveStyles.inputSize }}
            />
          </div>

          <div className="row">
            <div className="col-12 col-sm-6 col-md-3 mb-3">
              <FilterGroup 
                title="Tipo de Carrocería" 
                name="tipo" 
                options={tiposCarroceria} 
                count={conteoTipos} 
              />
            </div>
            
            <div className="col-12 col-sm-6 col-md-3 mb-3">
              <FilterGroup 
                title="Material" 
                name="material" 
                options={materiales} 
                count={conteoMateriales} 
              />
            </div>
            
            <div className="col-12 col-sm-6 col-md-3 mb-3">
              <FilterGroup 
                title="Ubicación" 
                name="ubicacion" 
                options={ciudadesColombia} 
                count={conteoUbicaciones} 
              />
            </div>
            
            <div className="col-12 col-sm-6 col-md-3 mb-3">
              <FilterGroup 
                title="Estado" 
                name="estado" 
                options={Estados} 
                count={conteoEstados} 
              />
              
              <div className="form-check form-switch mt-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="destacado"
                  name="destacado"
                  checked={filters.destacado}
                  onChange={handleFilterChange}
                  role="switch"
                />
                <label className="form-check-label" htmlFor="destacado" style={{ fontSize: responsiveStyles.inputSize }}>
                  Solo destacadas
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Listado de carrocerías */}
      <div className="row">
        {filteredCarrocerias.length > 0 ? (
          filteredCarrocerias.map(carroceria => (
            <div key={carroceria.id} className="col-12 col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm position-relative carroceria-card">
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
                
                <Link to={`/carrocerias/${carroceria.id}`} className="text-decoration-none text-dark">
                  <div id={`carouselCarroceria${carroceria.id}`} className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner ratio ratio-16x9">
                      {carroceria.imagenes.map((img, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                          <img 
                            src={img} 
                            className="d-block w-100 card-img-top"
                            alt={`${carroceria.tipo} ${carroceria.modelo}`}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = FallbackImage;
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
                  
                  <div className="card-body">
                    <h3 className="card-title" style={{ fontSize: responsiveStyles.cardTitleSize }}>
                      {carroceria.tipo} {carroceria.modelo} ({carroceria.año})
                    </h3>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="price" style={{ fontSize: responsiveStyles.priceSize }}>
                        {formatPrice(carroceria.precio)}
                      </span>
                      <span className="badge bg-dark" style={{ fontSize: responsiveStyles.badgeSize }}>
                        {carroceria.material}
                      </span>
                    </div>
                    <p className="card-text text-muted mb-3" style={{ fontSize: responsiveStyles.cardTextSize }}>
                      {carroceria.descripcion}
                    </p>
                    
                    <div className="mb-3">
                      {[
                        { label: 'Tipo', value: carroceria.tipo },
                        { label: 'Ubicación', value: carroceria.ubicacion },
                        { label: 'Estado', value: carroceria.estado, badge: true }
                      ].map((item, idx) => (
                        <div key={idx} className="d-flex justify-content-between mb-2">
                          <span style={{ fontSize: responsiveStyles.cardTextSize }}>{item.label}:</span>
                          {item.badge ? (
                            <span className={`badge bg-${carroceria.estado === 'Nueva' ? 'success' : carroceria.estado === 'Vendida' ? 'danger' : carroceria.estado === 'Usada' ? 'warning' : 'info'}`}>
                              {item.value.toUpperCase()}
                            </span>
                          ) : (
                            <strong style={{ fontSize: responsiveStyles.cardTextSize }}>{item.value}</strong>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </Link>
                
                <div className="card-footer bg-white border-top-0">
                  <Link 
                    to={`/carrocerias/${carroceria.id}`} 
                    className="btn btn-primary w-100"
                    style={{ fontSize: responsiveStyles.buttonSize }}
                  >
                    Ver detalles completos
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <div className="alert alert-info" style={{ fontSize: responsiveStyles.noResultsSize }}>
              <i className="bi bi-exclamation-circle-fill me-2"></i>
              No se encontraron carrocerías que coincidan con tu búsqueda.
            </div>
            <button 
              className="btn btn-outline-primary mt-3"
              onClick={() => {
                setSearchTerm('');
                setFilters({
                  tipo: '',
                  material: '',
                  estado: '',
                  ubicacion: '',
                  destacado: false
                });
              }}
              style={{ fontSize: responsiveStyles.buttonSize }}
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Carrocerias;