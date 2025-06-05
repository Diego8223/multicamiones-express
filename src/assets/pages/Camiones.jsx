import React, { useState, useEffect, useMemo } from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import FallbackImage from '../../assets/img/foton.jpg';
import './Camiones.css';

// Importa imágenes para el carrusel
import Multimarca from '../../assets/img/multimarca.jpg';
import Multicamiones from '../../assets/img/multicamiones.jpg';
import Expres from "../../assets/img/expres.jpg";

const Camiones = () => {
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

  // Configuración de rutas de imágenes locales para camiones
  const carouselItems = useMemo(() => [
    {
      image: Multimarca,
      altText: 'Camiones de alta calidad'
    },
    {
      image: Multicamiones,
      altText: 'Variedad de modelos disponibles'
    },
    {
      image: Expres,
      altText: 'Flota profesional de camiones'
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
    marca: '',
    tipo: '',
    modelo: '',
    ubicacion: '',
    estado: '',
    destacado: false
  });

  // Datos específicos para camiones
  const tiposCamion = [
    'Chasis', 'Estaca', 'Furgón', 'Grúa', 'Tanque', 'Tractocamión', 
    'Volqueta', 'Refrigerado', 'Cisterna', 'Cargo', 'Planchón ferretero', 'Trailer'
  ];

  const marcas = [
    'Chevrolet', 'Fotón', 'Hino', 'Kenworth', 'International', 'JMC',
    'JAC', 'Volkswagen', 'Mercedes', 'Freightliner', 'Shacman', 'Volvo',
    'Ford', 'Dongfeng', 'Renault', 'Hyundai', 'Dodge', 'DAF', 'Kia',
    'Mack', 'Daihatsu', 'Mitsubishi', 'Toyota', 'Nissan', 'DMF', 'Iveco',
    'Sinotruk', 'Otro'
  ];

  const ciudadesColombia = [
    'Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena',
    'Bucaramanga', 'Pereira', 'Manizales', 'Cúcuta', 'Ibagué'
  ];

  const Estados = ['Nuevo', 'Usado', 'Vendido'];

  const camiones = [
    {
      id: 1,
      marca: 'Foton',
      tipo: 'Tractocamión',
      modelo: 'FH16',
      ubicacion: 'Medellín',
      precio: 420000000,
      kilometraje: 145000,
      año: 2020,
      estado: 'Usado',
      destacado: true,
      descripcion: 'Tractocamión en excelente estado con mantenimiento al día, ideal para transporte pesado',
      imagenes: [
        '/img/fotonmediano.jpg',
        '/img/fotonmediano-2.jpg',
        '/img/fotonmediano-3.jpg'
      ],
      video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      especificaciones: {
        motor: 'D13K 540HP',
        transmision: 'I-Shift 12 velocidades',
        capacidad: '40 toneladas',
        ejes: '3',
        suspension: 'Neumática',
        extras: 'Cabina Globetrotter, Aire acondicionado, Dirección asistida'
      }
    },
    {
      id: 2,
      marca: 'Fotón',
      tipo: 'Estaca',
      modelo: 'Auman G7',
      ubicacion: 'Bogotá',
      precio: 185000000,
      kilometraje: 85000,
      año: 2021,
      estado: 'Usado',
      destacado: true,
      descripcion: 'Camión estaca con excelente rendimiento en combustible, mantenimiento en concesionario',
      imagenes: [
        '/img/foton-auman-1.jpg',
        '/img/foton-auman-2.jpg',
        '/img/foton-auman-3.jpg'
      ],
      video: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
      especificaciones: {
        motor: 'Cummins ISF3.8 168HP',
        transmision: 'Manual 8 velocidades',
        capacidad: '10 toneladas',
        ejes: '2',
        suspension: 'Ballestas',
        extras: 'Cabina amplia, Frenos ABS'
      }
    },
    {
      id: 3,
      marca: 'Mercedes',
      tipo: 'Furgón',
      modelo: 'Actros 2646',
      ubicacion: 'Cali',
      precio: 380000000,
      kilometraje: 120000,
      año: 2019,
      estado: 'Usado',
      destacado: false,
      descripcion: 'Furgón Mercedes en perfecto estado, ideal para transporte de carga seca',
      imagenes: [
        '/img/mercedes-actros-1.jpg',
        '/img/mercedes-actros-2.jpg',
        '/img/mercedes-actros-3.jpg'
      ],
      video: 'https://www.youtube.com/watch?v=JGwWNGJdvx8',
      especificaciones: {
        motor: 'OM 460 460HP',
        transmision: 'Powershift 12 velocidades',
        capacidad: '25 toneladas',
        ejes: '3',
        suspension: 'Neumática',
        extras: 'Control de crucero, Camara de retroceso'
      }
    },
    {
      id: 4,
      marca: 'Volvo',
      tipo: 'Volqueta',
      modelo: 'FMX 540',
      ubicacion: 'Barranquilla',
      precio: 520000000,
      kilometraje: 90000,
      año: 2022,
      estado: 'Usado',
      destacado: true,
      descripcion: 'Volqueta Volvo con bajo kilometraje, lista para trabajo pesado',
      imagenes: [
        '/img/volvo-volqueta-1.jpg',
        '/img/volvo-volqueta-2.jpg'
      ],
      video: 'https://www.youtube.com/watch?v=JGwWNGJdvx8',
      especificaciones: {
        motor: 'D13K 540HP',
        transmision: 'I-Shift 12 velocidades',
        capacidad: '30 toneladas',
        ejes: '3',
        suspension: 'Neumática',
        extras: 'Cabina con dormitorio, Aire acondicionado'
      }
    }
  ];

  // Función para contar camiones por propiedad
  const countBy = (prop) => {
    return camiones.reduce((acc, curr) => {
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

  const filteredCamiones = camiones.filter(camion => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = (
      camion.marca.toLowerCase().includes(searchLower) ||
      camion.modelo.toLowerCase().includes(searchLower) ||
      camion.descripcion.toLowerCase().includes(searchLower) ||
      camion.tipo.toLowerCase().includes(searchLower)
    );

    const matchesFilters = (
      (!filters.marca || camion.marca === filters.marca) &&
      (!filters.tipo || camion.tipo === filters.tipo) &&
      (!filters.ubicacion || camion.ubicacion === filters.ubicacion) &&
      (!filters.estado || camion.estado === filters.estado) &&
      (!filters.destacado || camion.destacado === filters.destacado)
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
  const conteoMarcas = countBy('marca');
  const conteoUbicaciones = countBy('ubicacion');
  const conteoDestacados = camiones.filter(c => c.destacado).length;

  // Estilos dinámicos responsive
  const responsiveStyles = {
    containerPadding: windowWidth < 768 ? '0 10px' : '0 20px',
    carouselHeight: windowWidth < 768 ? '300px' : '500px', // Aumentada altura para móviles
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
    filterLabelSize: windowWidth < 768 ? '0.9rem' : '1rem',
    cardImageHeight: windowWidth < 768 ? '250px' : '300px' // Nueva propiedad para altura de imágenes en cards
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
    <div className="camiones-container" style={{ padding: responsiveStyles.containerPadding, marginTop: windowWidth < 768 ? '60px' : '80px' }}>
      {/* Carrusel - Modificado para mejor visualización en móviles */}
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
              <div className="carousel-image-container" style={{ 
                height: responsiveStyles.carouselHeight,
                overflow: 'hidden'
              }}>
                {loading ? (
                  <div className="skeleton-loader" style={{ height: '100%', width: '100%' }} />
                ) : (
                  <img
                    className="d-block w-100 h-100"
                    src={item.image}
                    alt={item.altText}
                    loading="eager"
                    style={{ 
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%'
                    }}
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
        <h1 className="titulo-camiones fw-bold" style={{ fontSize: responsiveStyles.titleSize }}>
          CAMIONES NUEVOS Y USADOS
        </h1>
        <p className="lead" style={{ fontSize: responsiveStyles.cardTextSize }}>
          Encuentra el camión perfecto para tus necesidades de transporte
        </p>
      </header>

      {/* Contadores - Modificado con color azul #1e3a8a */}
      <div className="contadores-container mb-4">
        <div className="row g-3 justify-content-center">
          {[
            { label: 'Total', value: camiones.length },
            { label: 'Nuevos', value: conteoEstados['Nuevo'] || 0 },
            { label: 'Usados', value: conteoEstados['Usado'] || 0 },
            { label: 'Vendidos', value: conteoEstados['Vendido'] || 0 },
            { label: 'Destacados', value: conteoDestacados }
          ].map((item, index) => (
            <div key={index} className="col-6 col-sm-4 col-md-3 col-lg-2">
              <div className="counter-card rounded p-3 text-center shadow" style={{ backgroundColor: '#1e3a8a' }}>
                <div className="counter-value fw-bold text-white" style={{ fontSize: '1.5rem' }}>
                  {item.value}
                </div>
                <div className="counter-label text-white" style={{ fontSize: responsiveStyles.counterSize }}>
                  {item.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filtros */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h2 className="h5 mb-3" style={{ fontSize: responsiveStyles.cardTitleSize }}>
            <i className="bi bi-funnel-fill me-2"></i>
            Filtrar Camiones
          </h2>
          
          <div className="mb-3">
            <input
              type="search"
              className="form-control"
              placeholder="🔍 Buscar por marca, modelo o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ fontSize: responsiveStyles.inputSize }}
            />
          </div>

          <div className="row">
            <div className="col-12 col-sm-6 col-md-3 mb-3">
              <FilterGroup 
                title="Marca" 
                name="marca" 
                options={marcas} 
                count={conteoMarcas} 
              />
            </div>
            
            <div className="col-12 col-sm-6 col-md-3 mb-3">
              <FilterGroup 
                title="Tipo de Camión" 
                name="tipo" 
                options={tiposCamion} 
                count={conteoTipos} 
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
                  Solo destacados
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Listado de camiones - Modificado para mejor visualización */}
      <div className="row">
        {filteredCamiones.length > 0 ? (
          filteredCamiones.map(camion => (
            <div key={camion.id} className="col-12 col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm position-relative camion-card">
                {/* Overlay de vendido */}
                {camion.estado === 'Vendido' && (
                  <div className="sold-overlay">
                    <span className="sold-text">VENDIDO</span>
                  </div>
                )}
                
                {/* Ribbon de destacado - Modificado para posición superior */}
                {camion.destacado && (
                  <div className="ribbon ribbon-top-right" style={{ top: '10px', right: '10px' }}>
                    <span>⭐ DESTACADO</span>
                  </div>
                )}
                
                <Link to={`/camiones/${camion.id}`} className="text-decoration-none text-dark">
                  {/* Carrusel de imágenes del camión - Modificado para mejor visualización */}
                  <div id={`carouselCamion${camion.id}`} className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner" style={{ height: responsiveStyles.cardImageHeight }}>
                      {camion.imagenes.map((img, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                          <img 
                            src={img} 
                            className="d-block w-100 h-100"
                            alt={`${camion.marca} ${camion.modelo}`}
                            style={{
                              objectFit: 'cover',
                              width: '100%',
                              height: '100%'
                            }}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = FallbackImage;
                            }}
                          />
                        </div>
                      ))}
                    </div>
                    {camion.imagenes.length > 1 && (
                      <>
                        <button className="carousel-control-prev" type="button" data-bs-target={`#carouselCamion${camion.id}`} data-bs-slide="prev">
                          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                          <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target={`#carouselCamion${camion.id}`} data-bs-slide="next">
                          <span className="carousel-control-next-icon" aria-hidden="true"></span>
                          <span className="visually-hidden">Next</span>
                        </button>
                      </>
                    )}
                  </div>
                  
                  <div className="card-body">
                    <h3 className="card-title" style={{ fontSize: responsiveStyles.cardTitleSize }}>
                      {camion.marca} {camion.modelo} ({camion.año})
                    </h3>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="price" style={{ fontSize: responsiveStyles.priceSize }}>
                        {formatPrice(camion.precio)}
                      </span>
                      <span className="badge bg-dark" style={{ fontSize: responsiveStyles.badgeSize }}>
                        {camion.kilometraje.toLocaleString()} km
                      </span>
                    </div>
                    <p className="card-text text-muted mb-3" style={{ fontSize: responsiveStyles.cardTextSize }}>
                      {camion.descripcion}
                    </p>
                    
                    <div className="mb-3">
                      {[
                        { label: 'Tipo', value: camion.tipo },
                        { label: 'Ubicación', value: camion.ubicacion },
                        { label: 'Estado', value: camion.estado, badge: true }
                      ].map((item, idx) => (
                        <div key={idx} className="d-flex justify-content-between mb-2">
                          <span style={{ fontSize: responsiveStyles.cardTextSize }}>{item.label}:</span>
                          {item.badge ? (
                            <span className={`badge bg-${camion.estado === 'Nuevo' ? 'success' : camion.estado === 'Vendido' ? 'danger' : 'warning'}`}>
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
                    to={`/camiones/${camion.id}`} 
                    className="btn btn-primary w-100"
                    style={{ 
                      fontSize: responsiveStyles.buttonSize,
                      backgroundColor: '#1e3a8a',
                      borderColor: '#1e3a8a'
                    }}
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
              No se encontraron camiones que coincidan con tu búsqueda.
            </div>
            <button 
              className="btn btn-outline-primary mt-3"
              onClick={() => {
                setSearchTerm('');
                setFilters({
                  marca: '',
                  tipo: '',
                  estado: '',
                  ubicacion: '',
                  destacado: false
                });
              }}
              style={{ 
                fontSize: responsiveStyles.buttonSize,
                color: '#1e3a8a',
                borderColor: '#1e3a8a'
              }}
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Camiones;