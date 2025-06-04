import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapComponent.css'; // Cambiado a mayúscula para consistencia

// Configuración de iconos (mejorada con verificación de carga)
const configureLeafletIcons = () => {
  try {
    // Verificar si los iconos ya están configurados
    if (!L.Icon.Default.prototype._getIconUrl) {
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
      });
    }
  } catch (error) {
    console.error('Error configuring Leaflet icons:', error);
    return false;
  }
  return true;
};

const MapComponent = ({ 
  initialPosition = [6.2027037, -75.5833673], 
  zoomLevel = 16,
  markerTitle = 'Multicamiones Express - Sede Principal',
  popupContent = `
    <div class="map-popup-content">
      <h6>Multicamiones Express</h6>
      <p><strong>Dirección:</strong></p>
      <p>Carrera 50 2 Sur 189, Medellín</p>
      <p><strong>Teléfono:</strong> (604) 123 4567</p>
    </div>
  `
}) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Configurar iconos antes de inicializar el mapa
    if (!configureLeafletIcons()) {
      setError('Error al configurar los iconos del mapa');
      return;
    }

    const initMap = () => {
      try {
        if (!mapRef.current) return;

        mapInstance.current = L.map(mapRef.current, {
          preferCanvas: true,
        }).setView(initialPosition, zoomLevel);

        // Capa base de OpenStreetMap con mejores opciones
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          maxZoom: 19,
          minZoom: 3,
          detectRetina: true // Mejor visualización en pantallas HD
        }).addTo(mapInstance.current);

        // Evento de carga completa
        mapInstance.current.whenReady(() => {
          setMapLoaded(true);
          createMarker(initialPosition);
        });

        // Manejo de errores
        mapInstance.current.on('loaderror', (e) => {
          setError('Error al cargar el mapa. Por favor intente recargar.');
          console.error('Map load error:', e.message);
        });

      } catch (err) {
        setError('Error al inicializar el mapa');
        console.error('Map initialization error:', err.message);
      }
    };

    initMap();

    // Cleanup al desmontar
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [initialPosition, zoomLevel]);

  const createMarker = (position) => {
    try {
      if (!mapInstance.current) return;

      // Crear marcador con opciones mejoradas
      markerRef.current = L.marker(position, {
        title: markerTitle,
        alt: 'Ubicación de Multicamiones Express',
        keyboard: true,
        riseOnHover: true,
        draggable: false,
        autoPan: true
      }).addTo(mapInstance.current);

      // Configurar popup
      markerRef.current.bindPopup(popupContent, {
        className: 'custom-popup',
        maxWidth: 300,
        minWidth: 200,
        autoClose: false,
        closeOnClick: false
      });

      // Mejorar accesibilidad
      markerRef.current.on('popupopen', () => {
        const popup = markerRef.current?.getPopup();
        if (popup) {
          popup.getElement()
            ?.setAttribute('role', 'dialog')
            ?.setAttribute('aria-label', 'Información de ubicación');
        }
      });

      // Abrir popup automáticamente
      markerRef.current.openPopup();

    } catch (err) {
      console.error('Marker creation error:', err.message);
    }
  };

  return (
    <div className="map-container">
      {error ? (
        <div className="map-error" role="alert">
          {error}
          <button onClick={() => window.location.reload()} className="reload-btn">
            Recargar página
          </button>
        </div>
      ) : !mapLoaded ? (
        <div className="map-loading-indicator">
          <div className="spinner"></div>
          <p>Cargando mapa...</p>
        </div>
      ) : null}
      
      <div 
        ref={mapRef} 
        className={`leaflet-map ${mapLoaded ? 'map-loaded' : 'map-loading'}`}
        aria-label="Mapa interactivo de ubicación"
        aria-busy={!mapLoaded}
        role="application"
        style={{ height: '400px' }}
      />
    </div>
  );
};

export default MapComponent;