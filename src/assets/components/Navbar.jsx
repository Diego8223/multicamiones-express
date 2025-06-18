import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Moon, Sun } from "lucide-react";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import "./Navbar.css";
import logo from "../fotos/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Leer preferencia del usuario desde localStorage o media query
    return localStorage.getItem('darkMode') === 'true' || 
           (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const navigate = useNavigate();

  // Efecto para modo oscuro persistente
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem('darkMode', 'true');
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  // Verificar autenticación
  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem("user");
      setIsAuthenticated(!!user);
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    navigate("/");
  };

  const handleLinkClick = () => {
    if (isOpen) setIsOpen(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const socialLinks = [
    { 
      icon: <FaFacebook size={24} />, 
      label: "Facebook", 
      url: "https://www.facebook.com/MULTICAMIONESEXPRESS/",
      color: "#1877F2" // Color oficial de Facebook
    },
    { 
      icon: <FaInstagram size={24} />, 
      label: "Instagram", 
      url: "https://www.instagram.com/multicamionesexpresscol/",
      color: "#E4405F" // Color oficial de Instagram
    },
    { 
      icon: <FaTiktok size={24} />, 
      label: "TikTok", 
      url: "https://www.tiktok.com/@multicamionesexpr",
      color: "#000000" // Color oficial de TikTok
    }
  ];

  return (
    <nav className="navbar-custom" role="navigation" aria-label="Menú principal">
      <div className="navbar-container">
        {/* Logo y marca */}
        <Link to="/" className="logo-container" onClick={handleLinkClick}>
          <img src={logo} alt="Logo Multicamiones Express" className="logo" loading="lazy" />
          <h1 className="brand-name">Multicamiones Express</h1>
        </Link>

        {/* Menú escritorio */}
        <div className="desktop-menu-wrapper">
          <div className="menu-links">
            <Link to="/" className="menu-link">Inicio</Link>
            <Link to="/about" className="menu-link">Quiénes Somos</Link>
            <Link to="/camiones" className="menu-link">Camiones</Link>
            <Link to="/carrocerias" className="menu-link">Carrocerías</Link>
          </div>

          {/* Redes sociales en escritorio */}
          <div className="social-links-desktop" aria-label="Redes sociales">
            {socialLinks.map(({ icon, label, url, color }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`social-link ${label.toLowerCase()}`}
                aria-label={label}
                style={{ 
                  color: darkMode ? '#f0f0f0' : '#333',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = color}
                onMouseLeave={(e) => e.currentTarget.style.color = darkMode ? '#f0f0f0' : '#333'}
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Botón modo oscuro en escritorio */}
          <button
            className="dark-mode-toggle"
            onClick={toggleDarkMode}
            aria-label={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>

          {isAuthenticated && (
            <button
              className="logout-button"
              onClick={handleLogout}
              aria-label="Cerrar sesión"
            >
              Cerrar Sesión
            </button>
          )}
        </div>

        {/* Botón hamburguesa */}
        <button
          className="menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menú móvil */}
      <div
        id="mobile-menu"
        className={`mobile-menu ${isOpen ? "open" : ""}`}
        role="menu"
        aria-hidden={!isOpen}
      >
        <Link to="/" className="mobile-link" onClick={handleLinkClick}>Inicio</Link>
        <Link to="/about" className="mobile-link" onClick={handleLinkClick}>Quiénes Somos</Link>
        <Link to="/camiones" className="mobile-link" onClick={handleLinkClick}>Camiones</Link>
        <Link to="/carrocerias" className="mobile-link" onClick={handleLinkClick}>Carrocerías</Link>

        {/* Redes sociales en móvil */}
        <div className="mobile-socials" aria-label="Redes sociales móviles">
          {socialLinks.map(({ icon, label, url, color }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`social-link ${label.toLowerCase()}`}
              aria-label={label}
              style={{ 
                color: darkMode ? '#f0f0f0' : '#333',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = color}
              onMouseLeave={(e) => e.currentTarget.style.color = darkMode ? '#f0f0f0' : '#333'}
            >
              {icon}
            </a>
          ))}
        </div>

        {/* Botón modo oscuro en móvil */}
        <button
          className="mobile-dark-mode-toggle"
          onClick={toggleDarkMode}
          aria-label={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        >
          {darkMode ? (
            <>
              <Sun size={20} /> <span>Modo Claro</span>
            </>
          ) : (
            <>
              <Moon size={20} /> <span>Modo Oscuro</span>
            </>
          )}
        </button>

        {isAuthenticated && (
          <button
            className="mobile-logout-button"
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            aria-label="Cerrar sesión"
          >
            Cerrar Sesión
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;