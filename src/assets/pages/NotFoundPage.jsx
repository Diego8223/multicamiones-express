// src/assets/pages/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <div className="error-code">404</div>
      <h1 className="error-title">Página no encontrada</h1>
      <p className="error-message">
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </p>
      <Link to="/" className="btn btn-primary btn-lg mt-4">
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFoundPage;