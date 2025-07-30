import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import FallbackImage from '../../assets/img/foton.webp';
import './Camiones.css';

// Importa imágenes para el carrusel
import Multimarca from '../../assets/img/multimarca.webp';
import Multicamiones from '../../assets/img/multicamiones.webp';
import Expres from "../../assets/img/expres.webp";

const FilterGroup = React.memo(({ 
  title, 
  name, 
  options, 
  count, 
  filters, 
  handleFilterChange,
  responsiveStyles,
  windowWidth
}) => (
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
));

const Camiones = () => {
  // Estados del carrusel
  const [index, setIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
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
  const tiposCamion = useMemo(() => [
    'Chasis', 'Estaca', 'Furgón', 'Grúa', 'Tanque', 'Tractocamión', 
    'Volqueta', 'Refrigerado', 'Cisterna', 'Cargo', 'Planchón ferretero', 'Trailer', 'Camióneta', 'Camión' ,'Camión Pesado'
  ], []);

  const marcas = useMemo(() => [
    'Chevrolet', 'Fotón', 'Hino', 'Kenworth', 'International', 'JMC',
    'JAC', 'Volkswagen', 'Mercedes', 'Freightliner', 'Shacman', 'Volvo',
    'Ford', 'Dongfeng', 'Renault', 'Hyundai', 'Dodge', 'DAF', 'Kia',
    'Mack', 'Daihatsu', 'Mitsubishi', 'Toyota', 'Nissan', 'DMF', 'Iveco',
    'Sinotruk','Shineray', 'Volkswagen', 'Otro'
  ], []);

  const ciudadesColombia = useMemo(() => [
    'Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena',
    'Bucaramanga', 'Pereira', 'Manizales', 'Cúcuta', 'Ibagué'
  ], []);

  const Estados = useMemo(() => ['Nuevo', 'Usado', 'Vendido'], []);

  // Función para normalizar valores (eliminar espacios y convertir a minúsculas)
  const normalizeValue = useCallback((value) => {
    return value ? value.trim().toLowerCase() : '';
  }, []);

  const camiones = useMemo(() => {
    return [
      {
        id: 1,
        marca: 'CHEVROLET NHR ',
        tipo: '',
        modelo: '2017',
        ubicacion: 'Medellín',
        precio: 85000000,
        kilometraje: 208022,
        año: 2017,
        estado: 'Usado',
        destacado: true,
        descripcion: 'Una solucion Versátil para negocios en crecimiento',
        imagenes: [
          '/img/CHEVROLETNHR2017.webp',
          '/img/CHEVROLETNHR2017.webp',
          '/img/CHEVROLETNHR2017.webp'
        ],
        video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        especificaciones: {
          motor: '3.0L Disel',
          transmision: '',
          capacidad: '1634 kg Runt',
          ejes: '',
          suspension: '',
          extras: ''
        }
      },
      {
        id: 2,
        marca: 'Chevrolet',
        tipo: 'Camión',
        modelo: 'NLR',
        ubicacion: 'Medellín',
        precio: 130000000,
        kilometraje: 160486,
        año: 2023,
        estado: 'Usado',
        destacado: true,
        descripcion: 'Excelente opción para trabajo continuo,Versatilidad sin safrificar potencia',
        imagenes: [
          '/img/NLR3.webp',
          '/img/NLR3.webp',
          '/img/NLR3.webp'
        ],
        video: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
        especificaciones: {
          motor: '3,0 L DIESEL',
          capacidad: '1830 KG RUNT',
        }
      },
      {
        id: 3,
        marca: 'Chevrolet',
        tipo: 'Camión',
        modelo: 'NQR5',
        ubicacion: 'Medellín',
        precio: 160000000,
        kilometraje: 218377,
        año: 2018,
        estado: 'Usado',
        destacado: true,
        descripcion: 'Respaldo Chevrrolet en Desempeño y Durabilidad',
        imagenes: [
          '/img/NQR5.webp',
          '/img/NQR5.webp',
          '/img/NQR5.webp'
        ],
        video: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
        especificaciones: {
          motor: '3,0 L DIESEL',
          capacidad: '4650 KG RUNT',
        }
      },
      {
        id: 4,
        marca: 'Chevrolet',
        tipo: 'Camión',
        modelo: 'NHR 3,0L MT',
        ubicacion: 'Medellín',
        precio: 120000000,
        kilometraje: 62750,
        año: 2023,
        estado: 'Usado',
        destacado: true,
        descripcion: 'Excelente opción para emprendedores o flotas urbanas.',
        imagenes: [
          '/img/NHR3.webp',
          '/img/NHR3.webp',
          '/img/NHR3.webp'
        ],
        video: 'https://www.youtube.com/watch?v=JGwWNGJdvx8',
        especificaciones: {
          motor: '3,0 L Diesel',
          capacidad: '1,500 KG RUNT',
        }
      },
      {
        id: 5,
        marca: 'HINO ',
        tipo: 'Camión',
        modelo: '2011',
        ubicacion: 'Medellín',
        precio: 125000000,
        kilometraje: 492398,
        año: 2011,
        estado: 'Usado',
        destacado: true,
        descripcion: 'Una maquina de batalla para empresas que no se detienen',
        imagenes: [
          '/img/X30CARGO.webp',
          '/img/X30CARGO.webp',
          '/img/X30CARGO.webp'
        ],
        video: 'https://www.youtube.com/watch?v=JGwWNGJdvx8',
        especificaciones: {
          motor: '5,1L Diesel',
          transmision: 'Manual',
          capacidad: '6,000 KG RUNT',
        }
      },
      {
        id: 6,
        marca: 'International',
        tipo: 'Camión Pesado',
        modelo: '7600',
        ubicacion: 'Medellín',
        precio: 500000000,
        kilometraje: 149512,
        año: 2019,
        estado: 'Usado',
        destacado: true,
        descripcion: 'Traccion 6*4 para maximo rendimiento oportunidad para fortalecer tu flota con respaldo',
        imagenes: [
          '/img/INTERNATIONAL.webp',
          '/img/INTERNATIONAL.webp',
          '/img/INTERNATIONAL.webp'
        ],
        video: 'https://www.youtube.com/watch?v=JGwWNGJdvx8',
        especificaciones: {
          motor: '10,8 L Diesel',
          transmision: 'Manual',
          capacidad: '15,900 KG RUNT',
        }
      },
      {
        id: 7,
        marca: 'Chevrolet',
        tipo: 'Camión',
        modelo: 'NHR 3.0L MT',
        ubicacion: 'Medellín',
        precio: 90000000,
        kilometraje: 273471,
        año: 2016,
        estado: 'Usado',
        destacado: true,
        descripcion: 'Excelente alternativa para emprendedores y empresas',
        imagenes: [
          '/img/NHR2016.webp',
          '/img/NHR2016.webp',
          '/img/NHR2016.webp'
        ],
        video: 'https://www.youtube.com/watch?v=JGwWNGJdvx8',
        especificaciones: {
          motor: '3,0 L Diesel',
          transmision: 'Manual',
          capacidad: '1,700 KG RUNT',
        }
      },
      {
        id: 8,
        marca: 'JAC',
        tipo: 'Camión',
        modelo: 'HFC1171P3K3A53F',
        ubicacion: 'Medellín',
        precio: 270000000,
        kilometraje: 107699,
        año: 2019,
        estado: 'Usado',
        destacado: true,
        descripcion: 'Robusto,versátil y con la potencia que exige el trabajo pesado',
        imagenes: [
          '/img/CamionJac.webp',
          '/img/CamionJac.webp',
          '/img/CamionJac.webp'
        ],
        video: 'https://www.youtube.com/watch?v=JGwWNGJdvx8',
        especificaciones: {
          motor: '6,7 L Diesel',
          transmision: 'Manual',
          capacidad: '17,000 KG RUNT',
        }
      },
      
      {
        id: 9,
        marca: 'Toyota',
        tipo: 'Camióneta',
        modelo: 'Hilux',
        ubicacion: 'Medellín',
        precio: 40000000,
        kilometraje: 573522,
        año: 2001,
        estado: 'Usado',
        destacado: true,
        descripcion: 'Resistencia comprobada por generaciones',
        imagenes: [
          '/img/Hilux.webp',
          '/img/Hilux.webp',
          '/img/Hilux.webp'
        ],
        video: 'https://www.youtube.com/watch?v=JGwWNGJdvx8',
        especificaciones: {
          motor: '2,4 L Gasolina',
          transmision: 'Manual',
          capacidad: '1,000 KG RUNT',
        }
      },
      {
        id: 10,
        marca: 'Volkswagen',
        tipo: 'Camión',
        modelo: '9150OD',
        ubicacion: 'Medellín',
        precio: 75000000,
        kilometraje: 399280,
        año: 2007,
        estado: 'Usado',
        destacado: true,
        descripcion: 'Versatilidad para múltiples aplicaciones comerciales',
        imagenes: [
          '/img/VOLKSWAGEN.webp',
          '/img/VOLKSWAGEN.webp',
          '/img/VOLKSWAGEN.webp'
        ],
        video: 'https://www.youtube.com/watch?v=JGwWNGJdvx8',
        especificaciones: {
          motor: '4,3 L Diesel',
          transmision: 'Manual',
          capacidad: '3,450 KG RUNT',
        }
      },
      {
        id: 11,
        marca: 'Toyota Hino',
        tipo: 'Camión',
        modelo: 'FM8JRTA',
        ubicacion: 'Medellín',
        precio: 385000000,
        kilometraje: 321085,
        año: 2020,
        estado: 'Usado',
        destacado: true,
        descripcion: 'Este modelo ofrece eficiencia operativa.',
        imagenes: [
          '/img/CamionHino.webp',
          '/img/CamionHino.webp',
          '/img/CamionHino.webp'
        ],
        video: 'https://www.youtube.com/watch?v=JGwWNGJdvx8',
        especificaciones: {
          motor: '7,7 L Diesel',
          transmision: 'Manual',
          capacidad: '17,000 KG RUNT',
        }
      },
      {
        id: 12,
        marca: 'Chevrolet',
        tipo: 'Camión',
        modelo: 'NHR',
        ubicacion: 'Medellín',
        precio: 120000000,
        kilometraje: 74955,
        año: 2022,
        estado: 'Usado',
        destacado: true,
        descripcion: 'Perfecto para ciudad y trayectos frecuentes.',
        imagenes: [
          '/img/ChevroletNHR2022.webp',
          '/img/ChevroletNHR2022.webp',
          '/img/ChevroletNHR2022.webp'
        ],
        video: 'https://www.youtube.com/watch?v=JGwWNGJdvx8',
        especificaciones: {
          motor: '3,0 L Diesel',
          transmision: 'Manual',
          capacidad: '1,758 KG RUNT',
        }
      },
      {
        id: 13,
        marca: 'Chevrolet',
        tipo: 'Camión',
        modelo: 'NHR',
        ubicacion: 'Medellín',
        precio: 115000000,
        kilometraje: 98159,
        año: 2021,
        estado: 'Usado',
        destacado: true,
        descripcion: 'Respaldo Chevrolet bajo mantenimiento.',
        imagenes: [
          '/img/ChevroletNHR2021.webp',
          '/img/ChevroletNHR2021.webp',
          '/img/ChevroletNHR2021.webp'
        ],
        video: 'https://www.youtube.com/watch?v=JGwWNGJdvx8',
        especificaciones: {
          motor: '2,999 cc Diesel',
          transmision: 'Manual',
          capacidad: '1,758 KG RUNT',
        }
      },
      {
        id: 14,
        marca: 'Chevrolet',
        tipo: 'Camión',
        modelo: 'NLR',
        ubicacion: 'Medellín',
        precio: 129900000,
        kilometraje: 112101,
        año: 2023,
        estado: 'Usado',
        destacado: true,
        descripcion: 'Linea moderna,Respaldo Chevrolet.',
        imagenes: [
          '/img/ChevroletNLR2023.webp',
          '/img/ChevroletNLR2023.webp',
          '/img/ChevroletNLR2023.webp'
        ],
        video: 'https://www.youtube.com/watch?v=JGwWNGJdvx8',
        especificaciones: {
          motor: '2,999 cc Diesel',
          transmision: 'Manual',
          capacidad: '1,650 KG RUNT',
        }
      },
      {
        id: 15,
        marca: 'Nissan',
        tipo: 'Camión',
        modelo: 'Cabstar',
        ubicacion: 'Medellín',
        precio: 63000000,
        kilometraje: 176611,
        año: 2013,
        estado: 'Usado',
        destacado: true,
        descripcion: 'Marca de respaldo y confianza en el mercado.',
        imagenes: [
          '/img/Nissan2013.webp',
          '/img/Nissan2013.webp',
          '/img/Nissan2013.webp'
        ],
        video: 'https://www.youtube.com/watch?v=JGwWNGJdvx8',
        especificaciones: {
          motor: '2,999 cc Diesel',
          transmision: 'Manual',
          capacidad: '2,540 KG RUNT',
        }
      },
     
      {
        id: 16,
        marca: 'JAC',
        tipo: 'Camión',
        modelo: '',
        ubicacion: 'Medellín',
        precio: 88000000,
        kilometraje: 119766,
        año: 2022,
        estado: 'Usado',
        destacado: true,
        descripcion: 'Tecnologia actual y alto valor de reventa.',
        imagenes: [
          '/img/CamionJac2022.webp',
          '/img/CamionJac2022.webp',
          '/img/CamionJac2022.webp'
        ],
        video: 'https://www.youtube.com/watch?v=JGwWNGJdvx8',
        especificaciones: {
          motor: '2,746 cc Diesel',
          transmision: 'Manual',
          capacidad: '5,600 KG RUNT',
        }
      },
      {
        id: 17,
        marca: 'Fotón',
        tipo: 'Camión',
        modelo: '',
        ubicacion: 'Medellín',
        precio: 145000000,
        kilometraje: 114794,
        año: 2021,
        estado: 'Usado',
        destacado: true,
        descripcion: 'Soporte y buen desempeño en el mercado nacional.',
        imagenes: [
          '/img/FOTON2021.webp',
          '/img/FOTON2021.webp',
          '/img/FOTON2021.webp'
        ],
        video: 'https://www.youtube.com/watch?v=JGwWNGJdvx8',
        especificaciones: {
          motor: '3,760 cc Diesel',
          transmision: 'Manual',
          capacidad: '5,160 KG RUNT',
        }
      },
      {
        id: 18,
        marca: 'Hyundai',
        tipo: 'Camión',
        modelo: 'HD 78',
        ubicacion: 'Medellín',
        precio: 125000000,
        kilometraje: 173889,
        año: 2015,
        estado: 'Usado',
        destacado: true,
        descripcion: 'Reconocido por su resistencia en topografias complejas.',
        imagenes: [
          '/img/HYUNDAI2015.webp',
          '/img/HYUNDAI2015.webp',
          '/img/HYUNDAI2015.webp'
        ],
        video: 'https://www.youtube.com/watch?v=JGwWNGJdvx8',
        especificaciones: {
          motor: '3,9L Diesel',
          transmision: 'MECANICA',
          capacidad: '4,100 KG RUNT',
        }
      },
      {
        id: 19,
        marca: 'Fotón',
        tipo: 'Camión',
        modelo: 'BJ1041V9AD4-FB',
        ubicacion: 'Medellín',
        precio: 74000000,
        kilometraje: 92493,
        año: 2019,
        estado: 'Usado',
        destacado: true,
        descripcion: 'Muy bien conservado y listo para seguir produciendo.',
        imagenes: [
          '/img/FOTON2019.webp',
          '/img/FOTON2019.webp',
          '/img/FOTON2019.webp'
        ],
        video: 'https://www.youtube.com/watch?v=JGwWNGJdvx8',
        especificaciones: {
          motor: '2,776 CC Diesel',
          transmision: 'MANUAL',
          capacidad: '2,500 KG RUNT',
        }
      },
      {
        id: 20,
        marca: 'Toyota',
        tipo: 'Camióneta',
        modelo: 'Hilux',
        ubicacion: 'Medellín',
        precio: 28000000,
        kilometraje: 302358,
        año: 1998,
        estado: 'Usado',
        destacado: true,
        descripcion: 'Rodada,pero firme y con espiritud de trabajo.',
        imagenes: [
          '/img/CAMIONETATOYOTAHILUX.webp',
          '/img/CAMIONETATOYOTAHILUX.webp',
          '/img/CAMIONETATOYOTAHILUX.webp'
        ],
        video: 'https://www.youtube.com/watch?v=JGwWNGJdvx8',
        especificaciones: {
          motor: '2,400 CC Gasolina + Gas',
          transmision: 'MANUAL',
          capacidad: 'Para 5 pasajeros',
        }
      },
      {
        id: 21,
        marca: 'Mitsubishi',
        tipo: 'Camión',
        modelo: 'Fuso',
        ubicacion: 'Medellín',
        precio: 127000000,
        kilometraje: 269867,
        año: 2017,
        estado: 'Usado',
        destacado: true,
        descripcion: 'Buen desempeño mecanico y lista para seguir riendiendo.',
        imagenes: [
          '/img/MITSUBISHIFUSO.webp',
          '/img/MITSUBISHIFUSO.webp',
          '/img/MITSUBISHIFUSO.webp'
        ],
        video: 'https://www.youtube.com/watch?v=JGwWNGJdvx8',
        especificaciones: {
          motor: '3,9 L Diesel',
          transmision: 'MANUAL',
          capacidad: '9,000 KG RUNT',
        }
      },
      {
        id: 22,
        marca: 'JAC',
        tipo: 'Camión',
        modelo: '',
        ubicacion: 'Medellín',
        precio: 48000000,
        kilometraje: 242934,
        año: 2012,
        estado: 'Usado',
        destacado: true,
        descripcion: 'Buen estado general .',
        imagenes: [
          '/img/CAMIONJAC2012.webp',
          '/img/CAMIONJAC2012.webp',
          '/img/CAMIONJAC2012.webp'
        ],
        video: 'https://www.youtube.com/watch?v=JGwWNGJdvx8',
        especificaciones: {
          motor: '2,771 Diesel',
          transmision: 'MANUAL',
          capacidad: '3,000 KG RUNT',
        }
      },
      {
        id: 23,
        marca: 'Volvo',
        tipo: 'Camión',
        modelo: 'SISU RR143',
        ubicacion: 'Medellín',
        precio: 125000000,
        kilometraje: 0,
        año: 1979,
        estado: 'Usado',
        destacado: true,
        descripcion: 'Chasis de alta resistencia,mecanica confiable.',
        imagenes: [
          '/img/VOLVO1979.webp',
          '/img/VOLVO1979.webp',
          '/img/VOLVO1979.webp'
        ],
        video: 'https://www.youtube.com/watch?v=JGwWNGJdvx8',
        especificaciones: {
          motor: '9,000 CC Diesel',
          transmision: 'MANUAL',
          capacidad: '20,000 KG RUNT',
        }
      },
      {
        id: 24,
        marca: 'Hino',
        tipo: 'Camión',
        modelo: '300',
        ubicacion: 'Medellín',
        precio: 120000000,
        kilometraje: 452011,
        año: 2012,
        estado: 'Usado',
        destacado: true,
        descripcion: 'Reconocido por su bajo costo de operacion.',
        imagenes: [
          '/img/HINO3002012.webp',
          '/img/HINO3002012.webp',
          '/img/HINO3002012.webp'
        ],
        video: 'https://www.youtube.com/watch?v=JGwWNGJdvx8',
        especificaciones: {
          motor: '4,009 Diesel',
          transmision: 'MANUAL',
          capacidad: 'Ideal para reparto'  // CORRECCIÓN: Se eliminó la coma sobrante aquí
        }
      },
     {
  id: 25,
  marca: 'Chevrolet NHR',
  tipo: 'Camión',
  modelo: '',
  ubicacion: 'Medellín',
  precio: 105000000,
  kilometraje: 125088,
  año: 2020,
  estado: 'Usado',
  destacado: true,
  descripcion: 'Reconocido por su bajo costo de operacion.',
  imagenes: [
    '/img/CHEVROLETNHR2020.webp',
    '/img/CHEVROLETNHR2020.webp',
    '/img/CHEVROLETNHR2020.webp'
  ],
  video: 'https://www.youtube.com/watch?v=JGwWNGJdvx8',
  especificaciones: {
    motor: '3,0L Diesel',
    transmision: 'MANUAL',
    capacidad: 'De carga 1725 kg RUNT'
  } // ✅ Aquí no va coma si es el último atributo
}

  ]

return camiones.map(camion => ({
      ...camion,
      marca: normalizeValue(camion.marca) === 'fotón' ? 'Fotón' : camion.marca,
      tipo: normalizeValue(camion.tipo) === 'camión' ? 'Camión' : 
            normalizeValue(camion.tipo) === 'camióneta' ? 'Camióneta' : camion.tipo,
      ubicacion: normalizeValue(camion.ubicacion) === 'medellín' ? 'Medellín' : camion.ubicacion
    }));
  }, [normalizeValue]);

  // Actualizar ancho de ventana al cambiar tamaño con debounce
  useEffect(() => {
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, 100);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
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

  // Precarga de imágenes optimizada
  useEffect(() => {
    let isMounted = true;
    const loadImages = async () => {
      try {
        const imagePromises = carouselItems.map(item => {
          return new Promise((resolve) => {
            const img = new Image();
            img.src = item.image;
            img.onload = resolve;
            img.onerror = () => {
              console.error(`Error loading: ${item.image}`);
              resolve();
            };
          });
        });
        
        await Promise.all(imagePromises);
      } catch (error) {
        console.error('Error en carga de imágenes:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadImages();
    return () => { isMounted = false };
  }, [carouselItems]);

  // Función para contar camiones por propiedad (CORREGIDA)
  const countBy = useCallback((prop) => {
    return camiones.reduce((acc, curr) => {
      const key = curr[prop];
      if (key) {
        acc[key] = (acc[key] || 0) + 1;
      }
      return acc;
    }, {});
  }, [camiones]);

  const handleFilterChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }, []);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const filteredCamiones = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    return camiones.filter(camion => {
      const matchesSearch = (
        camion.marca?.toLowerCase().includes(searchLower) ||
        camion.modelo?.toLowerCase().includes(searchLower) ||
        camion.descripcion?.toLowerCase().includes(searchLower) ||
        camion.tipo?.toLowerCase().includes(searchLower)
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
  }, [camiones, searchTerm, filters]);

  const formatPrice = useCallback((price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  }, []);

  // Conteos optimizados
  const conteoEstados = useMemo(() => countBy('estado'), [countBy]);
  const conteoTipos = useMemo(() => countBy('tipo'), [countBy]);
  const conteoMarcas = useMemo(() => countBy('marca'), [countBy]);
  const conteoUbicaciones = useMemo(() => countBy('ubicacion'), [countBy]);
  const conteoDestacados = useMemo(() => camiones.filter(c => c.destacado).length, [camiones]);

  // Estilos dinámicos responsive
  const responsiveStyles = useMemo(() => ({
    containerPadding: windowWidth < 768 ? '0 10px' : '0 20px',
    carouselHeight: windowWidth < 768 ? '300px' : '500px',
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
    cardImageHeight: windowWidth < 768 ? '250px' : '300px'
  }), [windowWidth]);

  // Componente CamionCard memoizado
  const CamionCard = useCallback(({ camion }) => {
    return (
      <div className="card h-100 shadow-sm position-relative camion-card">
        {camion.estado === 'Vendido' && (
          <div className="sold-overlay">
            <span className="sold-text">VENDIDO</span>
          </div>
        )}
        
        {camion.destacado && (
          <div className="ribbon ribbon-top-right" style={{ top: '10px', right: '10px' }}>
            <span>⭐ DESTACADO</span>
          </div>
        )}
        
        <div className="card-content-wrapper">
          <div id={`carouselCamion${camion.id}`} className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner" style={{ height: responsiveStyles.cardImageHeight }}>
              {camion.imagenes.map((img, index) => (
                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                  <Link 
                    to={`/camiones/${camion.id}`} 
                    onClick={() => window.scrollTo(0, 0)}
                    style={{ display: 'block' }}
                  >
                    <img 
                      src={img} 
                      className="d-block w-100 h-100"
                      alt={`${camion.marca} ${camion.modelo}`}
                      style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%'
                      }}
                      loading={index > 0 ? "lazy" : "eager"}
                      decoding={index > 0 ? "async" : "sync"}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = FallbackImage;
                      }}
                    />
                  </Link>
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
            <Link 
              to={`/camiones/${camion.id}`} 
              className="text-decoration-none text-dark"
              onClick={() => window.scrollTo(0, 0)}
            >
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
            </Link>
          </div>
        </div>
        
        <div className="card-footer bg-white border-top-0">
          <Link 
            to={`/camiones/${camion.id}`} 
            className="btn btn-primary w-100"
            style={{ 
              fontSize: responsiveStyles.buttonSize,
              backgroundColor: '#1e3a8a',
              borderColor: '#1e3a8a'
            }}
            onClick={() => window.scrollTo(0, 0)}
          >
            Ver detalles completos
          </Link>
        </div>
      </div>
    );
  }, [formatPrice, responsiveStyles]);

  const resetFilters = useCallback(() => {
    setSearchTerm('');
    setFilters({
      marca: '',
      tipo: '',
      estado: '',
      ubicacion: '',
      destacado: false
    });
  }, []);

  return (
    <div className="camiones-container" style={{ padding: responsiveStyles.containerPadding, marginTop: windowWidth < 768 ? '60px' : '80px' }}>
      {/* Carrusel optimizado */}
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
                    decoding="sync"
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

      {/* Contadores optimizados */}
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

      {/* Filtros optimizados */}
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
              onChange={handleSearchChange}
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
                filters={filters}
                handleFilterChange={handleFilterChange}
                responsiveStyles={responsiveStyles}
                windowWidth={windowWidth}
              />
            </div>
            
            <div className="col-12 col-sm-6 col-md-3 mb-3">
              <FilterGroup 
                title="Tipo de Camión" 
                name="tipo" 
                options={tiposCamion} 
                count={conteoTipos} 
                filters={filters}
                handleFilterChange={handleFilterChange}
                responsiveStyles={responsiveStyles}
                windowWidth={windowWidth}
              />
            </div>
            
            <div className="col-12 col-sm-6 col-md-3 mb-3">
              <FilterGroup 
                title="Ubicación" 
                name="ubicacion" 
                options={ciudadesColombia} 
                count={conteoUbicaciones} 
                filters={filters}
                handleFilterChange={handleFilterChange}
                responsiveStyles={responsiveStyles}
                windowWidth={windowWidth}
              />
            </div>
            
            <div className="col-12 col-sm-6 col-md-3 mb-3">
              <FilterGroup 
                title="Estado" 
                name="estado" 
                options={Estados} 
                count={conteoEstados} 
                filters={filters}
                handleFilterChange={handleFilterChange}
                responsiveStyles={responsiveStyles}
                windowWidth={windowWidth}
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

      {/* Listado de camiones optimizado */}
      <div className="row">
        {filteredCamiones.length > 0 ? (
          filteredCamiones.map(camion => (
            <div key={camion.id} className="col-12 col-md-6 col-lg-4 mb-4">
              <CamionCard camion={camion} />
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
              onClick={resetFilters}
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