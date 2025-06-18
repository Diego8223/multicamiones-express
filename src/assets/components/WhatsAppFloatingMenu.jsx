import React, { useState } from 'react';
import './WhatsAppFloatingMenu.css';

const agents = [
  {
    name: 'Asesor De Ventas Juan Acosta',
    number: '573127767298',
    message: 'Hola, Bienvenido a multicamiones Express.'
  },
  {
    name: 'Asesor De Ventas Juan Restrepo',
    number: '573118813553',
    message: 'Hola, Bienvenido a multicamiones Express.'
  },
  {
    name: 'Asesor De Ventas Edwin Alvarez',
    number: '573007857038',
    message: 'Hola, Bienvenido a multicamiones Express.'
  },

  {
    name: 'Asesor De Ventas Julio Duque',
    number: '573015010196',
    message: 'Hola, Bienvenido a multicamiones Express.'
  },
  
];

const WhatsAppFloatingMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="whatsapp-floating-container">
      {isOpen && (
        <div className="whatsapp-menu">
          {agents.map((agent, index) => (
            <a
              key={index}
              href={`https://wa.me/${agent.number}?text=${encodeURIComponent(agent.message)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-agent btn btn-success"
            >
              <i className="bi bi-whatsapp me-2"></i>{agent.name}
            </a>
          ))}
        </div>
      )}

      <button
        className="btn btn-success whatsapp-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className={`bi ${isOpen ? 'bi-x-lg' : 'bi-whatsapp'}`}></i>
      </button>
    </div>
  );
};

export default WhatsAppFloatingMenu;
