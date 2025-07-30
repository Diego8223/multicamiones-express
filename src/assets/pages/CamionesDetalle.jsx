import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './CamionesDetalle.css';

// Función para limpiar números (eliminar espacios y el signo +)
const cleanNumber = (num) => num.replace(/[+\s]/g, '');

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
      marca: 'CHEVROLET NHR', 
      tipo: 'camión', 
      modelo: '2017', 
      ubicacion: 'Medellín, Colombia',
      precio: 85000000,
      kilometraje: 208022,
      año: 2017,
      estado: 'usado',
      destacado: true,
      descripcion: 'Una solución versátil para negocios en crecimiento.',
      imagenes: [
        '/img/camion1.webp',
        '/img/camion2.webp',
        '/img/camion3.webp',
      ],
      video: '',
      especificaciones: {
        'Motor': '3,0L Disel',
        'Peso bruto': '1,634 kg Runt',
        
      },
      caracteristicas: [
        'Motor 3,0 Disel - Rendimiento Comprobado para el Trabajo Diario,con excelente economia de combustible',
        'Caja Manual- Transmision Confiable,ideal para enfrentar recorridos urbanos o mixtos sin complicaciones',
        'Carga Util 1,634 kg RUNT Optimo para reparto,comercio al por mayor o transporte de insumos',
        '208,022 km  - Listo para seguir operando sin interrupciones."',

      ],
      garantia: '',
      contacto: {
        nombre: 'Juan Acosta',
        telefono: '+57 3127767298',
        whatsapp: '+57 3127767298',
        email: 'multicamionesexpressmed@gmail.com',
        horario: 'Lunes a Viernes: 9:00 AM - 5:00 PM / Sábados: 10:00 AM - 2:00 PM'
      }
    },

    { 
      id: 2, 
      marca: 'CHEVROLET NLR ', 
      tipo: 'camión', 
      modelo: '2023', 
      ubicacion: 'Medellín, Colombia',
      precio: 130000000,
      kilometraje: 160486,
      año: 2023,
      estado: 'usado',
      destacado: true,
      descripcion: 'Camión en excelente estado con mantenimiento al día, ideal para transporte pesado. Incluye todos los servicios recientes y documentación al día. Equipado con las últimas tecnologías en seguridad y confort para el conductor.',
      imagenes: [
        '/img/CHEVROLETNLR2023-1.webp',
        '/img/CHEVROLETNLR2023-2.webp',
        '/img/CHEVROLETNLR2023-3.webp',
      ],
      video: '',
      especificaciones: {
        'Motor': '3,8L Disel',
        'Peso bruto': '4,100 kg Runt',
        
      },
      caracteristicas: [
        'Motor 3,0 Disel -Rendimiento Solido y efeciente en operación Continua',
        'Caja Manual-Respuesta precisa en Trayectos exigentes',
        'Carga Util 1,830 kg RUNT Se adapta a rutas intensivas y entregas sin demoras',
        '160,486 km  - Listo para sumar kilómetros productivos "',
        
      ],
      garantia: '',
      contacto: {
        nombre: 'Edwin Alvarez',
        telefono: '+57 3007857038',
        whatsapp: '+57 3007857038',
        email: 'multicamionesexpressmed@gmail.com',
        horario: 'Lunes a Viernes: 9:00 AM - 5:00 PM / Sábados: 10:00 AM - 2:00 PM'
      }
    },

    {
      id: 3,
      marca: 'CHEVROLET NQR 5.2 ',
      tipo: 'camión',
      modelo: '2018', 
      ubicacion: 'Medellín',
      precio: 160000000,
      kilometraje: 218377,
      año: 2018,
      estado: 'usado',
      destacado: true,
      descripcion: 'Respaldo chevrolet en desempeño y Durabilidad',
      imagenes: [
        '/img/NQR5-1.webp',
        '/img/NQR5-2.webp',
        '/img/NQR5-3.webp',
      ],
      video: '',
      especificaciones: {
        'Motor': '5,2L Disel',
        'Capacidad De Carga': '4,650 kg Runt',
        
      },
      caracteristicas: [
        'Motor 5,2 Disel -Rendimiento Solido y efeciente en operación Continua',
        'Caja Manual-Manejo Preciso y Respuesta Inmediata en todo terreno',
        'Carga Util 4,650 kg RUNT Ideal para labores logisticas o reparto exigente',
        '218,377 km  - Listo para seguir produciendo desde el primer dia "',
        
      ],
      garantia: '',
      contacto: {
        nombre: 'Julio Duque',
        telefono: '+57 3015010196',
        whatsapp: '+57 3015010196',
        email: 'multicamionesexpressmed@gmail.com',
        horario: 'Lunes a Viernes: 9:00 AM - 5:00 PM / Sábados: 10:00 AM - 2:00 PM'
      }

    },

      { 
      id: 4, 
      marca: 'CHEVROLET NHR 3,0L MT ', 
      tipo: 'camión', 
      modelo: '2023', 
      ubicacion: 'Medellín, Colombia',
      precio: 120000000,
      kilometraje: 62750,
      año: 2023,
      estado: 'usado',
      destacado: true,
      descripcion: 'Excelnete Opción para emprendedores o flotas urbanas.',
      imagenes: [
        '/img/NHR3-1.webp',
        '/img/NHR3-2.webp',
        '/img/NHR3-3.webp',
      ],
      video: '',
      especificaciones: {
        'Motor': '3,0L Disel',
        'Peso bruto': '1,500 kg Runt',
        
      },
      caracteristicas: [
        'Motor 3,0 Disel -Rendimiento Solido y efeciente en operación Continua',
        'Caja Manual-Manejo Preciso y Respuesta Inmediata en todo terreno',
        'Carga Util 1,500 kg RUNT Perfecto para entregas,Transporte Liviano o logistica Local',
        '62,750 km  - Activo, operativo y listo para producir "',
        
      ],
      garantia: '',
      contacto: {
        nombre: 'Juan Restrepo',
        telefono: '+57 3118813553',
        whatsapp: '+57 3118813553',
        email: 'multicamionesexpressmed@gmail.com',
        horario: 'Lunes a Viernes: 9:00 AM - 5:00 PM / Sábados: 10:00 AM - 2:00 PM'
      }
    },
    { 
      id: 5, 
      marca: 'HINO', 
      tipo: 'Camión', 
      modelo: '2011', 
      ubicacion: 'MEDELLIN',
      precio: 125000000,
      kilometraje: 492398,
      año: 2011,
      estado: 'usado',
      destacado: true,
      descripcion: 'Una maquina de batalla para empresas que no se detienen.',
      imagenes: [
        '/img/Vans1.webp',
        '/img/Vans2.webp',
        '/img/Vans3.webp',
      ],
      video: '',
      especificaciones: {
        'Motor': '5,1L Disel',
        'Peso bruto': '6,000 kg Runt',
        
      },
      caracteristicas: [
        'Motor 5,1 Diesel - Fuerza constante para mover grandes cargas con eficiencia',
        'Caja Manual-Robusta y precisa,Lista para jornadas intensas.',
        'Carga Util 6,000 kg RUNT Perfecto para Obras,Distribucion de materiales, carga pesada o logistica nacional.',
        '492,398 km  - Motor operativo con historial de trabajo comprobado."',
        
      ],
      garantia: '',
      contacto: {
        nombre: 'Juan Acosta',
        telefono: '+57 3127767298',
        whatsapp: '+57 3127767298',
        email: 'multicamionesexpressmed@gmail.com',
        horario: 'Lunes a Viernes: 9:00 AM - 5:00 PM / Sábados: 10:00 AM - 2:00 PM'
      }
    },
    { 
      id: 6, 
      marca: 'INTERNATIONAL | 7600', 
      tipo: 'Camión Pesado', 
      modelo: '', 
      ubicacion: 'MEDELLIN',
      precio: 500000000,
      kilometraje: 149512,
      año: 2023,
      estado: 'usado',
      destacado: true,
      descripcion: 'Tracción 6*4 para maximo rendimiento oportunidad para fortalecer tu flota con respaldo.',
      imagenes: [
        '/img/INTERNATIONAL1.webp',
        '/img/INTERNATIONAL2.webp',
        '/img/INTERNATIONAL3.webp',
      ],
      video: '',
      especificaciones: {
        'Motor': '10,8L Diesel',
        'Peso bruto': '15,900 kg Runt',
        
      },
      caracteristicas: [
        'Motor 10,8 Diesel -Respuesta constante en operacion pesada',
        'Transmisión Manual-Control total en terrenos Complicados',
        'Capacidad de Carga - 15,900 KG RUNT ideal para Construcción,Transporte espacializado o carga Industrial',
        '149,512 km  - Mecanizado y listo para seguir operando "',
        
      ],
      garantia: '',
      contacto: {
        nombre: 'Edwin Alvarez',
        telefono: '+57 3007857038',
        whatsapp: '+57 3007857038',
        email: 'multicamionesexpressmed@gmail.com',
        horario: 'Lunes a Viernes: 9:00 AM - 5:00 PM / Sábados: 10:00 AM - 2:00 PM'
      }
    },
     { 
      id: 7, 
      marca: 'NHR 3.OL MT', 
      tipo: 'Camión', 
      modelo: '', 
      ubicacion: 'MEDELLIN',
      precio: 90000000,
      kilometraje: 273471,
      año: 2016,
      estado: 'usado',
      destacado: true,
      descripcion: 'Excelente alternativa para emprendedores.',
      imagenes: [
        '/img/NHR20161.webp',
        '/img/NHR20162.webp',
        '/img/NHR20163.webp',
      ],
      video: '',
      especificaciones: {
        'Motor': '3,0L Diesel',
        'Capacidad de Carga': '1,700 kg Runt',
        
      },
      caracteristicas: [
        'Motor 3,0L Diesel -Capaz de mantener el ritmo del dia con consumo eficiente',
        'Transmisión Manual-Mecanica simple y resistente, ideal para recorridos exigentes',
        'Capacidad de Carga - 1,700 KG RUNT Especial para transporte urbano domilicios y carga mediana ',
        '273,471 km  - Motor operativo y en uso,Listo para nuevas jornadas "',
        
      ],
      garantia: '',
      contacto: {
        nombre: 'Julio Duque',
        telefono: '+57 3015010196',
        whatsapp: '+57 3015010196',
        email: 'multicamionesexpressmed@gmail.com',
        horario: 'Lunes a Viernes: 9:00 AM - 5:00 PM / Sábados: 10:00 AM - 2:00 PM'
      }
    },

    { 
      id: 8, 
      marca: 'JAC', 
      tipo: 'Camión', 
      modelo: '', 
      ubicacion: 'MEDELLIN',
      precio: 270000000,
      kilometraje: 107699,
      año: 2019,
      estado: 'usado',
      destacado: true,
      descripcion: 'Robusto,versátil y con l apotencia que exige el trabajo pesado.',
      imagenes: [
        '/img/Jac1.webp',
        '/img/Jac2.webp',
        '/img/Jac3.webp',
      ],
      video: '',
      especificaciones: {
        'Motor': '6,7L Diesel',
        'Capacidad de Carga': '17,000 kg Runt',
        
      },
      caracteristicas: [
        'Motor 6,7L Diesel -potencia continua en cada jornada',
        'Caja Manual- control firme bajo cualquier condición',
        'Capacidad de Carga - 1,700 KG RUNT Ideal para transporte pesado y exigente',
        '107,699 km  - Listo para seguir producciendo"',
        
      ],
      garantia: '',
      contacto: {
        nombre: 'Juan Restrepo',
        telefono: '+57 3118813553',
        whatsapp: '+57 3118813553',
        email: 'multicamionesexpressmed@gmail.com',
        horario: 'Lunes a Viernes: 9:00 AM - 5:00 PM / Sábados: 10:00 AM - 2:00 PM'
      }
    },
    
   { 
      id: 9, 
      marca: 'TOYOTA HILUX', 
      tipo: 'Camióneta', 
      modelo: '', 
      ubicacion: 'MEDELLIN',
      precio: 40000000,
      kilometraje: 573522,
      año: 2001,
      estado: 'usado',
      destacado: true,
      descripcion: 'Resistencia comprobada por generaciones.',
      imagenes: [
        '/img/Hilux1.webp',
        '/img/Hilux2.webp',
        '/img/Hilux3.webp',
      ],
      video: '',
      especificaciones: {
        'Motor': '2,4L Gasolina',
        'Capacidad de Carga': '1,000 kg Runt',
        
      },
      caracteristicas: [
        'Motor 2,4La Gasolina - Agil y confiable para el dia a dia',
        'Transmisión Manual- Respuesta firme en cualquie terreno',
        'Capacidad de Carga - 1,000 KG RUNT Perfecta para labores livianas o usos mixtos',
        '573,522 km  - Lista para seguir rindiendo"',
        'Ideal para campo,ciudad o trabajo pesado"',
        
      ],
      garantia: '',
      contacto: {
        nombre: 'Edwin Alvarez',
        telefono: '+57 3007857038',
        whatsapp: '+57 3007857038',
        email: 'multicamionesexpressmed@gmail.com',
        horario: 'Lunes a Viernes: 9:00 AM - 5:00 PM / Sábados: 10:00 AM - 2:00 PM'
      }
    },
     { 
      id: 10, 
      marca: 'VOLKSWAGEN', 
      tipo: 'Camión', 
      modelo: '', 
      ubicacion: 'MEDELLIN',
      precio: 75000000,
      kilometraje: 399280,
      año: 2007,
      estado: 'usado',
      destacado: true,
      descripcion: 'Versatilidad para múltiples aplicaciones comerciales.',
      imagenes: [
        '/img/VOLKSWAGEN1.webp',
        '/img/VOLKSWAGEN2.webp',
        '/img/VOLKSWAGEN3.webp',
      ],
      video: '',
      especificaciones: {
        'Motor': '4,3L DIESEL',
        'Capacidad de Carga': '3,450 kg Runt',
        
      },
      caracteristicas: [
        'Motor 4,3 DIESEL - Potencia balanceada para trabajo continuo',
        'Transmisión Manual- Control confiable en todo tipo de terreno',
        'Capacidad de Carga - 3,450 KG RUNT Ideal para distrubucion urbana o intermunicipal',
        '399,280 km  - Mecanica Solida y al dia"',
        
        
      ],
      garantia: '',
      contacto: {
        nombre: 'Julio Duque',
        telefono: '+57 3015010196',
        whatsapp: '+57 3015010196',
        email: 'multicamionesexpressmed@gmail.com',
        horario: 'Lunes a Viernes: 9:00 AM - 5:00 PM / Sábados: 10:00 AM - 2:00 PM'
      }
    },
   { 
      id: 11, 
      marca: 'TOYOTA HINO', 
      tipo: 'Camión', 
      modelo: '', 
      ubicacion: 'MEDELLIN',
      precio: 385000000,
      kilometraje: 321085,
      año: 2020,
      estado: 'usado',
      destacado: true,
      descripcion: 'Este modelo ofrece eficiencia operativa.',
      imagenes: [
        '/img/CamionHino1.webp',
        '/img/CamionHino2.webp',
        '/img/CamionHino3.webp',
      ],
      video: '',
      especificaciones: {
        'Motor': '7,7L DIESEL',
        'Capacidad de Carga': '17,000 kg Runt',
        
      },
      caracteristicas: [
        'Motor 7,7 DIESEL - Responde con fuerza en pendiente y carga completa',
        'Transmisión Manual- Precisión en cada cambio,incluso en periodos exigentes ',
        'Capacidad de Carga - 17,000 KG RUNT Perfecto para logistica pesada y construcción',
        '321,085 km  - Operativo con historial solido de uso"',
        
        
      ],
      garantia: '',
      contacto: {
        nombre: 'Juan Restrepo',
        telefono: '+57 3118813553',
        whatsapp: '+57 3118813553',
        email: 'multicamionesexpressmed@gmail.com',
        horario: 'Lunes a Viernes: 9:00 AM - 5:00 PM / Sábados: 10:00 AM - 2:00 PM'
      }
      },

       { 
      id: 12, 
      marca: 'CHEVROLET NHR', 
      tipo: 'Camión', 
      modelo: '', 
      ubicacion: 'MEDELLIN',
      precio: 120000000,
      kilometraje: 74955,
      año: 2022,
      estado: 'usado',
      destacado: true,
      descripcion: 'perfecto para ciudades y trayectos frecuentes.',
      imagenes: [
        '/img/ChevroletNHR20221.webp',
        '/img/ChevroletNHR20222.webp',
        '/img/ChevroletNHR20223.webp',
      ],
      video: '',
      especificaciones: {
        'Motor': '3,0L DIESEL',
        'Capacidad de Carga': '1,758 kg Runt',
        
      },
      caracteristicas: [
        'Motor 3,0 DIESEL - Agil y rendidor para recorridos urbanos',
        'Transmisión Manual- Control confiable y mantenimiento sencillo',
        'Capacidad de Carga - 1,758 KG RUNT ideal para reparto y logistica urbana',
        '74955 km  - Funcionamiento al 100% ideal para comenzar inmediato"',
        
        
      ],
      garantia: '',
      contacto: {
        nombre: 'Juan Acosta',
        telefono: '+57 3127767298',
        whatsapp: '+57 3127767298',
        email: 'multicamionesexpressmed@gmail.com',
        horario: 'Lunes a Viernes: 9:00 AM - 5:00 PM / Sábados: 10:00 AM - 2:00 PM'
      }
    },
   { 
      id: 13, 
      marca: 'CHEVROLET NHR', 
      tipo: 'Camión', 
      modelo: '', 
      ubicacion: 'MEDELLIN',
      precio: 115000000,
      kilometraje: 98159,
      año: 2021,
      estado: 'usado',
      destacado: true,
      descripcion: 'Respaldo Chevrolet,bajo mantenimiento.',
      imagenes: [
        '/img/ChevroletNHR20211.webp',
        '/img/ChevroletNHR20212.webp',
        '/img/ChevroletNHR20213.webp',
      ],
      video: '',
      especificaciones: {
        'Motor': '2,999 cc DIESEL',
        'Capacidad de Carga': '1,758 kg Runt',
        
      },
      caracteristicas: [
        'Motor 2,999 cc DIESEL - Rendimiento eficiente y consumo controlado',
        'Transmisión Manual- Maniobrabilidad en ciudad y trayectos ajustados',
        'Capacidad de Carga - 1,758 KG RUNT ideal para entregas urbanas y transporte liviano',
        '98159 km  - Funcionamiento al 100% ideal para comenzar inmediato"',
        
        
      ],
      garantia: '',
      contacto: {
        nombre: 'Edwin Alvarez',
        telefono: '+57 3007857038',
        whatsapp: '+57 3007857038',
        email: 'multicamionesexpressmed@gmail.com',
        horario: 'Lunes a Viernes: 9:00 AM - 5:00 PM / Sábados: 10:00 AM - 2:00 PM'
      }
    },
     { 
      id: 14, 
      marca: 'CHEVROLET NLR', 
      tipo: 'Camión', 
      modelo: '', 
      ubicacion: 'MEDELLIN',
      precio: 129900000,
      kilometraje: 112101,
      año: 2023,
      estado: 'usado',
      destacado: true,
      descripcion: 'Linea Moderna,Respaldo Chevrolet.',
      imagenes: [
        '/img/ChevroletNLR20231.webp',
        '/img/ChevroletNLR20232.webp',
        '/img/ChevroletNLR20233.webp',
      ],
      video: '',
      especificaciones: {
        'Motor': '2,999 cc DIESEL',
        'Capacidad de Carga': '1,650 kg Runt',
        
      },
      caracteristicas: [
        'Motor 2,999 cc DIESEL - Bajo consumo y alto Desempeño',
        'Transmisión Manual- Respuesta Rapida y Mayor Control',
        'Capacidad de Carga - 1,650 KG RUNT ideal para entregas urbanas y transporte liviano',
        '112101 km  - Excelente estado y listo para seguir produciendo"',
        
        
      ],
      garantia: '',
      contacto: {
        nombre: 'Julio Duque',
        telefono: '+57 3015010196',
        whatsapp: '+57 3015010196',
        email: 'multicamionesexpressmed@gmail.com',
        horario: 'Lunes a Viernes: 9:00 AM - 5:00 PM / Sábados: 10:00 AM - 2:00 PM'
      }
    },
  
   { 
      id: 15, 
      marca: 'CHEVROLET NLR', 
      tipo: 'Camión', 
      modelo: '', 
      ubicacion: 'MEDELLIN',
      precio: 63000000,
      kilometraje: 112101,
      año: 2013,
      estado: 'usado',
      destacado: true,
      descripcion: 'Marca de respaldo y confianza en el mercado.',
      imagenes: [
        '/img/Nissan20131.webp',
        '/img/Nissan20132.webp',
        '/img/Nissan20133.webp',
      ],
      video: '',
      especificaciones: {
        'Motor': '2,999 cc DIESEL',
        'Capacidad de Carga': '2,540 kg Runt',
        
      },
      caracteristicas: [
        'Motor 2,999 cc DIESEL - Económico confiable y de facil mantenimiento',
        'Transmisión Manual - conducción eficiente para recorridos urbanos y regionales ',
        'Capacidad de Carga - 2,540 KG RUNT Ideal para entregas diarias,distribucion y carga liviana ',
        '176611 km  - En buen estado operativo,Listo para seguir trabajando"',
        
        
      ],
      garantia: '',
      contacto: {
        nombre: 'Juan Restrepo',
        telefono: '+57 3118813553',
        whatsapp: '+57 3118813553',
        email: 'multicamionesexpressmed@gmail.com',
        horario: 'Lunes a Viernes: 9:00 AM - 5:00 PM / Sábados: 10:00 AM - 2:00 PM'
      }
    },
    
   { 
      id: 16, 
      marca: 'JAC', 
      tipo: 'Camión', 
      modelo: '', 
      ubicacion: 'MEDELLIN',
      precio: 88000000,
      kilometraje: 119766,
      año: 2022,
      estado: 'usado',
      destacado: true,
      descripcion: ' tecnologia actual y alto valor de reventa.',
      imagenes: [
        '/img/CamionJac20221.webp',
        '/img/CamionJac20222.webp',
        '/img/CamionJac20223.webp',
      ],
      video: '',
      especificaciones: {
        'Motor': '2,746 cc Diesel',
        'Capacidad de Carga': '5,600 kg Runt',
        
      },
      caracteristicas: [
        'Motor 2,746 cc Diesel - Potente y eficiente,ideal para recorridos largos y carga constante',
        'Transmisión Manual - Mayor control y rendimiento en carretera',
        'Capacidad de Carga - 5,600 KG RUNT Perfecto para transporte de mercancia,Mudanzas o uso empresarial',
        '119766 km  - Uso moderado, mantenimiento al dia "',
        
        
      ],
      garantia: '',
      contacto: {
        nombre: 'Edwin Alvarez',
        telefono: '+57 3007857038',
        whatsapp: '+57 3007857038',
        email: 'multicamionesexpressmed@gmail.com',
        horario: 'Lunes a Viernes: 9:00 AM - 5:00 PM / Sábados: 10:00 AM - 2:00 PM'
      }
    },
  
  { 
      id: 17, 
      marca: 'FOTON', 
      tipo: 'Camión', 
      modelo: '', 
      ubicacion: 'MEDELLIN',
      precio: 145000000,
      kilometraje: 114794,
      año: 2021,
      estado: 'usado',
      destacado: true,
      descripcion: 'Soporte repuesto y buen desempeño en el mercado nacional.',
      imagenes: [
        '/img/FOTON20211.webp',
        '/img/FOTON20212.webp',
        '/img/FOTON20213.webp',
      ],
      video: '',
      especificaciones: {
        'Motor': '3,760 cc Diesel',
        'Capacidad de Carga': '5,160 kg Runt',
        
      },
      caracteristicas: [
        'Motor 3,760 cc Diesel - Fuerza y eficiencia para el dia a dia',
        'Transmisión Manual - Conducción precisa y mayor control',
        'Capacidad de Carga - 5,600 KG RUNT Idela para distribución,logistica o carga urbana',
        '119766 km  - Mantenimiento al dia y en excelente estado "',
        
        
      ],
      garantia: '',
      contacto: {
        nombre: 'Julio Duque',
        telefono: '+57 3015010196',
        whatsapp: '+57 3015010196',
        email: 'multicamionesexpressmed@gmail.com',
        horario: 'Lunes a Viernes: 9:00 AM - 5:00 PM / Sábados: 10:00 AM - 2:00 PM'
      }
    },
   { 
      id: 18, 
      marca: 'HYUNDAI', 
      tipo: 'Camión', 
      modelo: '', 
      ubicacion: 'MEDELLIN',
      precio: 125000000,
      kilometraje: 173889,
      año: 2015,
      estado: 'usado',
      destacado: true,
      descripcion: 'Reconocido por su resistencia ne topografias complejas.',
      imagenes: [
        '/img/HYUNDAI20151.webp',
        '/img/HYUNDAI20152.webp',
        '/img/HYUNDAI20153.webp',
      ],
      video: '',
      especificaciones: {
        'Motor': '3,9 L Diesel',
        'Capacidad de Carga': '4,100 kg Runt',
        
      },
      caracteristicas: [
        'Motor 3,9 L Diesel - Tracción y fuerza para escenarios exigentes',
        'Transmisión Mecanica - Respuesta inmediata en operacion constante',
        'Capacidad de Carga - 4,100 KG RUNT Estructura reforzada y lista para trabajo pesado',
        '173889 km  - Mantenimiento al dia y en excelente estado "',
        
        
      ],
      garantia: '',
      contacto: {
        nombre: 'Juan Restrepo',
        telefono: '+57 3118813553',
        whatsapp: '+57 3118813553',
        email: 'multicamionesexpressmed@gmail.com',
        horario: 'Lunes a Viernes: 9:00 AM - 5:00 PM / Sábados: 10:00 AM - 2:00 PM'
      }
    },
     { 
      id: 19, 
      marca: 'FOTON', 
      tipo: 'Camión', 
      modelo: '', 
      ubicacion: 'MEDELLIN',
      precio: 74000000,
      kilometraje: 92493,
      año: 2019,
      estado: 'usado',
      destacado: true,
      descripcion: 'Muy bien conservado y listo para seguir produciendo.',
      imagenes: [
        '/img/FOTON20191.webp',
        '/img/FOTON20192.webp',
        '/img/FOTON20193.webp',
      ],
      video: '',
      especificaciones: {
        'Motor': '2,776 CC Diesel',
        'Capacidad de Carga': '2,500 kg Runt',
        
      },
      caracteristicas: [
        'Motor 2,776 CC Diesel - Ahorro en consumo,fuerza para cualquier jornada',
        'Transmisión Manual - Manejable y precisa para ruta urbana o carretera',
        'Capacidad de Carga - 2,500 KG RUNT El punto justo entre agilidad y carga util',
        '92493 km  - Mantenimiento al dia y en excelente estado "',
        
        
      ],
      garantia: '',
      contacto: {
        nombre: 'Juan Acosta',
        telefono: '+57 3127767298',
        whatsapp: '+57 3127767298',
        email: 'multicamionesexpressmed@gmail.com',
        horario: 'Lunes a Viernes: 9:00 AM - 5:00 PM / Sábados: 10:00 AM - 2:00 PM'
      }
    },
     { 
      id: 20, 
      marca: 'TOYOTA HILUX', 
      tipo: 'Camióneta', 
      modelo: '', 
      ubicacion: 'MEDELLIN',
      precio: 28000000,
      kilometraje: 302358,
      año: 1998,
      estado: 'usado',
      destacado: true,
      descripcion: 'Rodada pero firme y con espiritud de trabajo.',
      imagenes: [
        '/img/CAMIONETATOYOTAHILUX1.webp',
        '/img/CAMIONETATOYOTAHILUX2.webp',
        '/img/CAMIONETATOYOTAHILUX3.webp',
      ],
      video: '',
      especificaciones: {
        'Motor': '2,400 CC Gasolina + Gas',
        'Capacidad de Carga': '5 pasajeros',
        
      },
      caracteristicas: [
        'Motor 2,400 CC Gasolina + Gas - Economica y Funcional para trabajo diario',
        'Transmisión Manual - Conducción sencilla y de bajo mantenimiento',
        'Capacidad de Carga - Para 5 pasajeros Ideal para pasajeros,equipos de trabajo o uso mixto',
        '302328 km  - Mantenimiento al dia y en excelente estado "',
        
        
      ],
      garantia: '',
      contacto: {
        nombre: 'Edwin Alvarez',
        telefono: '+57 3007857038',
        whatsapp: '+57 3007857038',
        email: 'multicamionesexpressmed@gmail.com',
        horario: 'Lunes a Viernes: 9:00 AM - 5:00 PM / Sábados: 10:00 AM - 2:00 PM'
      }
    },
    { 
      id: 21, 
      marca: 'MITSUBISHI', 
      tipo: 'Camión', 
      modelo: '', 
      ubicacion: 'MEDELLIN',
      precio: 127000000,
      kilometraje: 269867,
      año: 2017,
      estado: 'usado',
      destacado: true,
      descripcion: 'Buen desempeño mecanico y listo para seguir rindiendo.',
      imagenes: [
        '/img/MITSUBISHIFUSO1.webp',
        '/img/MITSUBISHIFUSO2.webp',
        '/img/MITSUBISHIFUSO3.webp',
      ],
      video: '',
      especificaciones: {
        'Motor': '3,9 L DIESEL',
        'Capacidad de Carga': '9,000 RUNT ',
        
      },
      caracteristicas: [
        'Motor 3,9 CC Diesel - Eficiencia comprobada en recorridos urbanos e intermunicipales',
        'Transmisión Manual - control total en todo tipo de terreno',
        'Capacidad de Carga - excelente capcidad de carga para distribucion logistica o carga comercial',
        '269867 km  - Buen desempeño mecanico y listo para seguir rindiendo "',
        
        
      ],
      garantia: '',
      contacto: {
        nombre: 'Julio Duque',
        telefono: '+57 3015010196',
        whatsapp: '+57 3015010196',
        email: 'multicamionesexpressmed@gmail.com',
        horario: 'Lunes a Viernes: 9:00 AM - 5:00 PM / Sábados: 10:00 AM - 2:00 PM'
      }
    },
    { 
      id: 22, 
      marca: 'JAC', 
      tipo: 'Camión', 
      modelo: '', 
      ubicacion: 'MEDELLIN',
      precio: 48000000,
      kilometraje: 269867,
      año: 2012,
      estado: 'usado',
      destacado: true,
      descripcion: 'Buen estado general, listo para seguir produciendo.',
      imagenes: [
        '/img/CAMIONJAC20121.webp',
        '/img/CAMIONJAC20122.webp',
        '/img/CAMIONJAC20123.webp',
      ],
      video: '',
      especificaciones: {
        'Motor': '2,771  DIESEL',
        'Capacidad de Carga': '3,000  KG RUNT ',
        
      },
      caracteristicas: [
        'Motor 2,771 CC Diesel - Rendimiento eficiente y bajo consumo',
        'Transmisión Manual - control total en cada carga',
        'Capacidad de Carga - 3.000 kg RUNT Ideal para distribucion urbana o regional',
        '242934 km  - Buen estado general, listo para seguir produciendo"',
        
        
      ],
      garantia: '',
      contacto: {
        nombre: 'Juan Restrepo',
        telefono: '+57 3118813553',
        whatsapp: '+57 3118813553',
        email: 'multicamionesexpressmed@gmail.com',
        horario: 'Lunes a Viernes: 9:00 AM - 5:00 PM / Sábados: 10:00 AM - 2:00 PM'
      }
    },
    { 
      id: 23, 
      marca: 'VOLVO', 
      tipo: 'Camión', 
      modelo: '', 
      ubicacion: 'MEDELLIN',
      precio: 125000000,
      kilometraje: 269867,
      año: 1979,
      estado: 'usado',
      destacado: true,
      descripcion: 'Chasis de alta resistencia,rendimiento potente.',
      imagenes: [
        '/img/VOLVO19791.webp',
        '/img/VOLVO19792.webp',
        '/img/VOLVO19793.webp',
      ],
      video: '',
      especificaciones: {
        'Motor': '9,000 CC  DIESEL',
        'Capacidad de Carga': '20,000  KG RUNT ',
        
      },
      caracteristicas: [
        'Motor 9,000 CC Diesel - Hecho para trabajos que exigen lo mejor',
        'Transmisión Manual - Respuesta firme bajo cualquier carga',
        'Capacidad de Carga - 20.000 kg RUNT Perfecto para misiones pesadas',
        
        
        
      ],
      garantia: '',
      contacto: {
        nombre: 'Juan Acosta',
        telefono: '+57 3127767298',
        whatsapp: '+57 3127767298',
        email: 'multicamionesexpressmed@gmail.com',
        horario: 'Lunes a Viernes: 9:00 AM - 5:00 PM / Sábados: 10:00 AM - 2:00 PM'
      }
    },
     { 
      id: 24, 
      marca: 'HINO', 
      tipo: 'Camión', 
      modelo: 'XZU423L-HKMR', 
      ubicacion: 'MEDELLIN',
      precio: 120000000,
      kilometraje: 452011,
      año: 2012,
      estado: 'usado',
      destacado: true,
      descripcion: 'Reconocido por su bajo costo de operación.',
      imagenes: [
        '/img/HINO30020121.webp',
        '/img/HINO30020122.webp',
        '/img/HINO30020123.webp',
      ],
      video: '',
      especificaciones: {
        'Motor': '4,009 CC  DIESEL',
        'Capacidad de Carga': 'Ideal para reparto',
        
      },
      caracteristicas: [
        'Motor 4,009 CC Diesel - Potente,durable y económico en consumo',
        'Transmisión Manual - Respuesta firme bajo cualquier carga',
        'Capacidad de Carga - Bajo costo de operación',

      ],
      garantia: '',
      contacto: {
        nombre: 'Juan Acosta',
        telefono: '+57 3127767298',
        whatsapp: '+57 3127767298',
        email: 'multicamionesexpressmed@gmail.com',
        horario: 'Lunes a Viernes: 9:00 AM - 5:00 PM / Sábados: 10:00 AM - 2:00 PM'
      }
    },
    { 
      id: 25, 
      marca: 'Chevrolet NHR', 
      tipo: 'Camión', 
      modelo: '', 
      ubicacion: 'MEDELLIN',
      precio: 105000000,
      kilometraje: 125088,
      año: 2020,
      estado: 'usado',
      destacado: true,
      descripcion: 'Tamaño versátil con buena capacidad útil.',
      imagenes: [
        '/img/CHEVROLETNHR20201.webp',
        '/img/CHEVROLETNHR20202.webp',
        '/img/CHEVROLETNHR20203.webp',
      ],
      video: '',
      especificaciones: {
        'Motor': '3,0L DIESEL',
        'Capacidad de Carga': '1725 kg RUNT',
        
      },
      caracteristicas: [
        'Motor 3,0L Diesel - Económico,Confiable y facil de mantener',
        'Transmisión Manual - Control preciso y respuesta constante',
        'Capacidad de Carga - 1.725 KG RUNT Perfecto para rutas urbanas y entregas',

      ]
    },
       
  ]

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
                      href={`https://wa.me/${cleanNumber(camion.contacto.whatsapp)}?text=Hola, estoy interesado en el camión ${camion.marca} ${camion.modelo} (ID: ${camion.id})`} 
                      className="btn btn-success py-3 fs-5 fw-bold d-flex align-items-center justify-content-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="bi bi-whatsapp fs-4 me-2"></i>
                      WhatsApp
                    </a>
                    <a 
                      href={`tel:${cleanNumber(camion.contacto.telefono)}`} 
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