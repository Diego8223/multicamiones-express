import React, { useState, useEffect, useMemo } from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import FallbackImage from '../../assets/img/foton.jpg'; 
import './Camiones.css'; // Asegúrate de que este CSS esté bien definido

// Importa imágenes para el carrusel
import Multimarca from '../../assets/img/multimarca.jpg';
import Multicamiones from '../../assets/img/multicamiones.jpg';
import Expres from "../../assets/img/expres.jpg";




const Camiones = () => {
  // Estados del carrusel
  const [index, setIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [loading, setLoading] = useState(true);

  // Configuración de rutas de imágenes locales
  const carouselItems = useMemo(() => [
    { image: Multimarca, altText: 'Variedad de marcas de camiones' },
    { image: Multicamiones, altText: 'Flota de camiones disponibles' },
    { image: Expres, altText: 'Servicio express de camiones' }
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
    destacado: false, 
  });

  // Datos para filtros
  const tiposVehiculo = [
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

  const Estados = ['usado', 'nuevo', 'vendido'];

  // Datos de ejemplo mejorados
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
      estado: 'usado',
      destacado: true,
      descripcion: 'Tractocamión en excelente estado con mantenimiento al día, ideal para transporte pesado',
      imagenes: [
        '/img/fotonmediano.jpg',
        
      ],
      video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Se quitará este video en el renderizado
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
      estado: 'usado',
      destacado: true,
      descripcion: 'Camión estaca con excelente rendimiento en combustible, mantenimiento en concesionario',
      imagenes: [
        '/img/foton-auman-1.jpg',
        '/img/foton-auman-2.jpg'
      ],
      video: 'https://www.youtube.com/watch?v=M_Tj_z_q00I', // Se quitará este video en el renderizado
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
      estado: 'usado',
      destacado: false,
      descripcion: 'Furgón Mercedes en perfecto estado, ideal para transporte de carga seca',
      imagenes: [
        '/img/mercedes-actros-1.jpg'
      ],
      video: null, // Ejemplo sin video
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
      marca: 'Freightliner', 
      tipo: 'Tractocamión', 
      modelo: 'Cascadia', 
      ubicacion: 'Barranquilla',
      precio: 450000000,
      kilometraje: 90000,
      año: 2022,
      estado: 'nuevo',
      destacado: true,
      descripcion: 'Tractocamión Freightliner Cascadia nuevo, listo para trabajar',
      imagenes: [
        '/img/freightliner-cascadia-1.jpg',
        '/img/freightliner-cascadia-2.jpg'
      ],
      video: 'https://www.youtube.com/watch?v=F0p7v66wE7E', // Se quitará este video en el renderizado
      especificaciones: {
        motor: 'Detroit DD15',
        transmision: 'Automática Detroit DT12',
        capacidad: '45 toneladas',
        ejes: '3',
        suspension: 'Neumática',
        extras: 'Paquete de seguridad, Confort mejorado'
      }
    },
    { 
      id: 5, 
      marca: 'Chevrolet', 
      tipo: 'Volqueta', 
      modelo: 'FVR', 
      ubicacion: 'Cúcuta',
      precio: 250000000,
      kilometraje: 200000,
      año: 2018,
      estado: 'vendido',
      destacado: false,
      descripcion: 'Volqueta Chevrolet FVR en buen estado, ideal para construcción',
      imagenes: [
        '/img/chevrolet-fvr-1.jpg'
      ],
      video: null,
      especificaciones: {
        motor: 'Isuzu 6HK1',
        transmision: 'Manual',
        capacidad: '15 metros cúbicos',
        ejes: '2',
        suspension: 'Ballestas',
        extras: 'Aire acondicionado'
      }
    }
  ];

  // Función mejorada para extraer IDs de YouTube (se mantiene aunque no se use en el renderizado actual)
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

  const filteredCamiones = camiones.filter(camion => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = (
      camion.marca.toLowerCase().includes(searchLower) ||
      camion.modelo.toLowerCase().includes(searchLower) ||
      camion.descripcion.toLowerCase().includes(searchLower)
    );
    
    const matchesFilters = (
      (!filters.marca || camion.marca === filters.marca) &&
      (!filters.tipo || camion.tipo === filters.tipo) &&
      (!filters.ubicacion || camion.ubicacion === filters.ubicacion) &&
      (!filters.estado || camion.estado === filters.estado) &&
      (!filters.destacado || camion.destacado === true) 
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

  const countBy = (prop) => {
    return camiones.reduce((acc, curr) => {
      const key = curr[prop]?.toString() || 'desconocido';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
  };

  const conteoEstados = countBy('estado');
  const conteoTipos = countBy('tipo');
  const conteoUbicaciones = countBy('ubicacion');
  const conteoMarcas = countBy('marca');
  const conteoDestacados = camiones.filter(c => c.destacado).length;

  return (
    <div className="camiones-container"> 
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
              {loading ? (
                <div className="skeleton-loader" style={{ height: '500px', width: '100%' }} /> 
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

      {/* Título de la sección movido fuera del carrusel */}
      <header 
        className="text-center mb-3 mt-5 titulo-camiones-wrapper" // Ajustado el margen superior
      >
        <h1 className="titulo-camiones mb-3">
          Camiones Nuevos y Usados
        </h1>
      </header>

      {/* Contenido principal de camiones */}
      <div className="container-fluid p-4 mt-0 position-relative"> {/* Ajustado el margen superior */}
        <div className="container-fluid px-3 px-md-4 mt-0">
          <div className="row justify-content-center">
            <div className="col-12">
              <header className="text-center mb-4">
                <div className="contadores-container d-flex flex-wrap justify-content-center gap-2 mb-4">
                  <div className="contador-badge">
                    <h5 className="mb-0">Total: {camiones.length}</h5>
                  </div>
                  <div className="contador-badge">
                    <h5 className="mb-0">Nuevos: {conteoEstados['nuevo'] || 0}</h5>
                  </div>
                  <div className="contador-badge">
                    <h5 className="mb-0">Usados: {conteoEstados['usado'] || 0}</h5>
                  </div>
                  <div className="contador-badge">
                    <h5 className="mb-0">Vendidos: {conteoEstados['vendido'] || 0}</h5>
                  </div>
                  <div className="contador-badge">
                    <h5 className="mb-0">Destacados: {conteoDestacados}</h5>
                  </div>
                </div>
              </header>
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
                      placeholder="🔍 Buscar por marca, modelo o características..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <div className="row g-2 g-md-3">
                    <div className="col-6 col-md-3">
                      <select
                        name="marca"
                        className="form-select"
                        onChange={handleFilterChange}
                        value={filters.marca}
                      >
                        <option value="">Todas las marcas ({marcas.length})</option>
                        {marcas.map(marca => (
                          <option key={marca} value={marca}>
                            {marca} ({conteoMarcas[marca] || 0})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-6 col-md-3">
                      <select
                        name="tipo"
                        className="form-select"
                        onChange={handleFilterChange}
                        value={filters.tipo}
                      >
                        <option value="">Todos los tipos ({tiposVehiculo.length})</option>
                        {tiposVehiculo.map(tipo => (
                          <option key={tipo} value={tipo}>
                            {tipo} ({conteoTipos[tipo] || 0})
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
                          <option value="nuevo">Nuevo ({conteoEstados['nuevo'] || 0})</option>
                          <option value="usado">Usado ({conteoEstados['usado'] || 0})</option>
                          <option value="vendido">Vendido ({conteoEstados['vendido'] || 0})</option>
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
                            Destacados
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
            {filteredCamiones.length > 0 ? (
              filteredCamiones.map(camion => {
                // Ya no necesitamos videoId aquí, pero la función getYouTubeId se mantiene
                // en caso de que la necesites para otras funcionalidades en el futuro.
                // const videoId = getYouTubeId(camion.video); 
                
                return (
                  <div key={camion.id} className="col">
                    <div className="card h-100 shadow-sm position-relative hover-effect">
                      {camion.estado === 'vendido' && (
                        <div className="sold-overlay">
                          <span className="sold-text">VENDIDO</span>
                        </div>
                      )}
                      
                      {camion.destacado && (
                        <div className="ribbon ribbon-top-right">
                          <span>⭐ DESTACADO</span>
                        </div>
                      )}
                      
                      <Link to={`/camiones/${camion.id}`} className="text-decoration-none">
                        <div id={`carouselCamion${camion.id}`} className="carousel slide" data-bs-ride="carousel">
                          <div className="carousel-inner ratio ratio-16x9">
                            {camion.imagenes.map((img, index) => (
                              <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                <img 
                                  src={img} 
                                  className="d-block w-100"
                                  alt={`${camion.marca} ${camion.modelo}`}
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = FallbackImage; // Usa FallbackImage para camiones
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
                      </Link>
                      
                      {/* SE HA ELIMINADO LA SECCIÓN DE VIDEO AQUÍ */}
                      
                      <div className="card-body">
                        <h3 className="card-title fw-bold text-primary">
                          {camion.marca} {camion.modelo} ({camion.año})
                        </h3>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <span className="h4 text-danger">{formatPrice(camion.precio)}</span>
                          <span className="badge bg-dark">{camion.kilometraje.toLocaleString()} km</span>
                        </div>
                        <p className="card-text text-muted">{camion.descripcion}</p>
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item d-flex justify-content-between">
                            <span>Tipo:</span>
                            <strong>{camion.tipo}</strong>
                          </li>
                          <li className="list-group-item d-flex justify-content-between">
                            <span>Ubicación:</span>
                            <strong>{camion.ubicacion}</strong>
                          </li>
                          <li className="list-group-item d-flex justify-content-between">
                            <span>Estado:</span>
                            <strong className={`badge bg-${camion.estado === 'nuevo' ? 'success' : camion.estado === 'vendido' ? 'danger' : 'warning'}`}>
                              {camion.estado.toUpperCase()}
                            </strong>
                          </li>
                        </ul>
                        <div className="mt-3">
                          <Link to={`/camiones/${camion.id}`} className="btn btn-primary w-100">
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
                <p className="lead">No se encontraron camiones que coincidan con tu búsqueda.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ); 
}

export default Camiones;