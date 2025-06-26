import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Inicio.css';

const videos = [
  {
    id: 'Zba22B5RimA',
    title: 'MULTICAMIONES EXPRESS - Trailer Oficial ',
    description: 'Visitanos y Conoce Nuestra Empresa.'
  }
];

const Inicio = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true); // Muteado por defecto para autoplay
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const playerRef = useRef(null);

  // Inicializar la API de YouTube
  useEffect(() => {
    const loadYouTubeAPI = () => {
      if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        // Si la API ya está cargada
        createPlayer();
      }
    };

    window.onYouTubeIframeAPIReady = createPlayer;

    loadYouTubeAPI();

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);

  // Crear el reproductor
  const createPlayer = () => {
    playerRef.current = new window.YT.Player('youtube-player', {
      videoId: videos[currentIndex].id,
      height: '360',
      width: '640',
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
          setIsPlayerReady(true);
          event.target.playVideo();
        },
        onStateChange: (event) => {
          if (event.data === window.YT.PlayerState.ENDED) {
            event.target.playVideo(); // Repetir automáticamente
          } else if (event.data === window.YT.PlayerState.PLAYING) {
            setIsPlaying(true);
          } else if (event.data === window.YT.PlayerState.PAUSED) {
            setIsPlaying(false);
          }
        }
      }
    });
  };

  // Manejar cambios en isPlaying
  useEffect(() => {
    if (!isPlayerReady || !playerRef.current) return;

    if (isPlaying) {
      playerRef.current.playVideo();
    } else {
      playerRef.current.pauseVideo();
    }
  }, [isPlaying, isPlayerReady]);

  // Manejar cambios en isMuted
  useEffect(() => {
    if (!isPlayerReady || !playerRef.current) return;

    if (isMuted) {
      playerRef.current.mute();
    } else {
      playerRef.current.unMute();
    }
  }, [isMuted, isPlayerReady]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="inicio-container">
      <section className="video-section">
        <div className="video-wrapper">
          {/* Contenedor para el reproductor de YouTube */}
          <div id="youtube-player"></div>
        </div>

        <div className="video-info">
          <h2>{videos[currentIndex].title}</h2>
          <p>{videos[currentIndex].description}</p>
        </div>

        <div className="video-controls">
          <button onClick={togglePlay} className="control-btn" aria-label={isPlaying ? 'Pausar' : 'Reproducir'}>
            {isPlaying ? (
              <svg viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>
          
          <button onClick={toggleMute} className="control-btn" aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}>
            {isMuted ? (
              <svg viewBox="0 0 24 24">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              </svg>
            )}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Inicio;