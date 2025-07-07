import React, { useState, useRef, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Inicio.css'; // Asegúrate de que este archivo contiene los estilos CSS específicos de Inicio.

const videos = [
  {
    id: 'UzMNJV-RR-I', // ID de tu video de YouTube
    title: 'MULTICAMIONES EXPRESS ',
    description: 'Visítanos y Conoce Nuestra Empresa'
  }
];

// Componente memoizado para controles
const ControlButton = React.memo(({ onClick, children, label }) => (
  <button onClick={onClick} className="control-btn" aria-label={label}>
    {children}
  </button>
));

// Componente memoizado para el reproductor de YouTube
const YouTubePlayer = React.memo(({ playerRef, playerContainerRef, isMuted, onReady, onStateChange }) => {
  useEffect(() => {
    // console.log("YouTubePlayer useEffect running. Checking window.YT:", window.YT);

    // Asegúrate de que window.YT y el contenedor estén disponibles antes de crear el reproductor
    if (!window.YT || !window.YT.Player || !playerContainerRef.current) {
      // console.warn("YouTube API not yet loaded or container ref not available. Skipping player creation.");
      return;
    }
    
    // Destruye el reproductor existente si hay alguno para evitar múltiples instancias
    if (playerRef.current) {
      // console.log("Destroying existing YouTube player.");
      playerRef.current.destroy();
      playerRef.current = null;
    }

    // console.log("Creating new YouTube player...");
    playerRef.current = new window.YT.Player(playerContainerRef.current, {
      videoId: videos[0].id,
      // No especificar width/height aquí, lo manejaremos con CSS para responsividad
      playerVars: {
        autoplay: 1,
        mute: isMuted ? 1 : 0,
        rel: 0,            // No mostrar videos relacionados al final
        modestbranding: 1, // Ocultar el logo de YouTube en la barra de control
        disablekb: 1,      // Desactivar controles de teclado
        fs: 0,             // Deshabilitar botón de pantalla completa
        iv_load_policy: 3, // No mostrar anotaciones
        playsinline: 1,    // Reproducir en línea en iOS
        enablejsapi: 1,    // Habilitar la API de JavaScript
        origin: window.location.origin // Prevenir posibles problemas de seguridad en iframe
      },
      events: {
        onReady: (event) => {
          // console.log("YouTube Player is ready.");
          onReady(event);
        },
        onStateChange: (event) => {
          // console.log("YouTube Player state changed:", event.data);
          onStateChange(event);
        }
      }
    });
    
    // Función de limpieza para destruir el reproductor cuando el componente se desmonte
    return () => {
      if (playerRef.current) {
        // console.log("Cleaning up YouTube player on unmount.");
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [playerRef, playerContainerRef, isMuted, onReady, onStateChange]);
  
  return <div id="youtube-player" ref={playerContainerRef}></div>; // Añadimos un ID aquí
});

const Inicio = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const apiLoadedRef = useRef(false);

  // Carga diferida de YouTube API
  const loadYouTubeAPI = useCallback(() => {
    if (apiLoadedRef.current || typeof window === 'undefined') {
      // console.log("YouTube API already loaded or not in browser environment. Skipping load.");
      return;
    }
    
    if (window.YT && window.YT.Player) {
      apiLoadedRef.current = true;
      // console.log("YouTube API already available on window.YT.");
      // Si la API ya está, podemos considerar el reproductor listo
      setIsPlayerReady(true);
      return;
    }
    
    // Esta es la función global que el API de YouTube llamará cuando esté listo
    // Aseguramos que solo se defina una vez
    if (!window.onYouTubeIframeAPIReady) {
      window.onYouTubeIframeAPIReady = () => {
        apiLoadedRef.current = true;
        // console.log("YouTube IFrame API is ready. Setting isPlayerReady to true.");
        setIsPlayerReady(true); 
      };
    }

    const script = document.createElement('script');
    // *** ¡LA URL OFICIAL Y RECOMENDADA PARA EL API DE YOUTUBE! ***
    script.src = 'https://www.youtube.com/iframe_api'; 
    script.async = true;
    script.defer = true;
    script.onload = () => {
      // console.log("YouTube API script element loaded into DOM. Waiting for onYouTubeIframeAPIReady...");
    };
    script.onerror = (e) => {
      console.error("Failed to load YouTube API script:", e);
      // Podrías mostrar un mensaje al usuario aquí si el video no carga
    };
    document.body.appendChild(script);
    // console.log("YouTube API script appended to body.");
  }, []);

  // Cargar API cuando el componente se monte
  useEffect(() => {
    loadYouTubeAPI();
    
    return () => {
      // Limpieza del reproductor cuando el componente se desmonte
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [loadYouTubeAPI]);

  // Handler para cuando el reproductor está listo
  const handlePlayerReady = useCallback((event) => {
    setIsPlayerReady(true);
    // console.log("Player ready callback. isPlaying:", isPlaying);
    if (isPlaying) { 
      event.target.playVideo();
    }
  }, [isPlaying]);

  // Handler para cambios de estado del reproductor
  const handlePlayerStateChange = useCallback((event) => {
    if (window.YT) { // Asegurarse de que YT está disponible
      if (event.data === window.YT.PlayerState.ENDED) {
        // console.log("Video ended, replaying.");
        event.target.playVideo(); // Loop video
      } else if (event.data === window.YT.PlayerState.PLAYING) {
        // console.log("Video is playing.");
        setIsPlaying(true);
      } else if (event.data === window.YT.PlayerState.PAUSED) {
        // console.log("Video is paused.");
        setIsPlaying(false);
      }
    }
  }, []);

  // Toggle para silenciar/activar sonido
  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      if (isPlayerReady && playerRef.current) {
        if (prev) {
          playerRef.current.unMute();
          // console.log("Unmuting video.");
        } else {
          playerRef.current.mute();
          // console.log("Muting video.");
        }
      }
      return !prev;
    });
  }, [isPlayerReady]);

  // Toggle para reproducir/pausar
  const togglePlay = useCallback(() => {
    setIsPlaying(prev => {
      if (isPlayerReady && playerRef.current) {
        if (prev) {
          playerRef.current.pauseVideo();
          // console.log("Pausing video.");
        } else {
          playerRef.current.playVideo();
          // console.log("Playing video.");
        }
      }
      return !prev;
    });
  }, [isPlayerReady]);

  return (
    <div className="inicio-container">
      <section className="video-section">
        <div className="video-wrapper">
          {/* Solo renderiza YouTubePlayer cuando el API de YouTube está cargado y listo */}
          {isPlayerReady ? (
            <YouTubePlayer
              playerRef={playerRef}
              playerContainerRef={playerContainerRef}
              isMuted={isMuted}
              onReady={handlePlayerReady}
              onStateChange={handlePlayerStateChange}
            />
          ) : (
            <div className="loading-message">Cargando video...</div> 
          )}
        </div>

        <div className="video-info">
          <h2>{videos[0].title}</h2>
          <p>{videos[0].description}</p>
        </div>

        <div className="video-controls">
          <ControlButton onClick={togglePlay} label={isPlaying ? 'Pausar' : 'Reproducir'}>
            {isPlaying ? (
              <svg viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </ControlButton>
          
          <ControlButton onClick={toggleMute} label={isMuted ? 'Activar sonido' : 'Silenciar'}>
            {isMuted ? (
              <svg viewBox="0 0 24 24">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              </svg>
            )}
          </ControlButton>
        </div>
      </section>
    </div>
  );
};

export default React.memo(Inicio);