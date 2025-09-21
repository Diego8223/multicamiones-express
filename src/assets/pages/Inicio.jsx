import React, { useState, useRef, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Inicio.css';

const videos = [
  {
    id: 'UzMNJV-RR-I',
    title: 'MULTICAMIONES EXPRESS ',
    description: 'Visítanos y Conoce Nuestra Empresa'
  }
];

const ControlButton = React.memo(({ onClick, children, label }) => (
  <button onClick={onClick} className="control-btn" aria-label={label}>
    {children}
  </button>
));

const YouTubePlayer = React.memo(({ playerRef, playerContainerRef, isMuted, onReady, onStateChange }) => {
  useEffect(() => {
    if (!window.YT || !window.YT.Player || !playerContainerRef.current) {
      return;
    }
    
    if (playerRef.current) {
      playerRef.current.destroy();
      playerRef.current = null;
    }

    playerRef.current = new window.YT.Player(playerContainerRef.current, {
      videoId: videos[0].id,
      playerVars: {
        autoplay: 1,
        mute: isMuted ? 1 : 0,
        rel: 0,
        modestbranding: 1,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
        playsinline: 1,
        enablejsapi: 1,
        origin: window.location.origin
      },
      events: {
        onReady: (event) => {
          onReady(event);
        },
        onStateChange: (event) => {
          onStateChange(event);
        }
      }
    });
    
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [playerRef, playerContainerRef, isMuted, onReady, onStateChange]);
  
  return <div id="youtube-player" ref={playerContainerRef}></div>;
});

const Inicio = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [apiLoaded, setApiLoaded] = useState(false);
  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);

  // Carga de YouTube API
  useEffect(() => {
    // Si ya está cargada la API
    if (window.YT && window.YT.Player) {
      setApiLoaded(true);
      setIsPlayerReady(true);
      return;
    }
    
    // Si ya hay un script cargándose
    if (document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      // Configuramos el callback para cuando esté lista
      window.onYouTubeIframeAPIReady = () => {
        setApiLoaded(true);
        setIsPlayerReady(true);
      };
      return;
    }
    
    // Crear el script para cargar la API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
    // Configurar la función global que YouTube llamará cuando la API esté lista
    window.onYouTubeIframeAPIReady = () => {
      setApiLoaded(true);
      setIsPlayerReady(true);
    };
  }, []);

  const handlePlayerReady = useCallback((event) => {
    setIsPlayerReady(true);
    if (isPlaying) { 
      event.target.playVideo();
    }
  }, [isPlaying]);

  const handlePlayerStateChange = useCallback((event) => {
    if (window.YT) {
      if (event.data === window.YT.PlayerState.ENDED) {
        event.target.playVideo();
      } else if (event.data === window.YT.PlayerState.PLAYING) {
        setIsPlaying(true);
      } else if (event.data === window.YT.PlayerState.PAUSED) {
        setIsPlaying(false);
      }
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (isPlayerReady && playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute();
      } else {
        playerRef.current.mute();
      }
      setIsMuted(!isMuted);
    }
  }, [isPlayerReady, isMuted]);

  const togglePlay = useCallback(() => {
    if (isPlayerReady && playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlayerReady, isPlaying]);

  return (
    <div className="inicio-container">
      <section className="video-section">
        <div className="video-wrapper">
          {apiLoaded ? (
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