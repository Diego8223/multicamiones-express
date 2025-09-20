import React, { useState } from 'react';
import TagManager from 'react-gtm-module'; // <-- Importamos GTM
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

  // 🔹 Función para enviar evento a GTM cuando se da clic en un agente
  const handleWhatsAppClick = (agentName, agentNumber, code) => {
    TagManager.dataLayer({
      dataLayer: {
        event: "whatsapp_click",
        agent_name: agentName,
        agent_number: agentNumber,
        whatsapp_code: code // 👈 Agregamos el código de identificación
      }
    });
  };

  return (
    <div className="whatsapp-floating-container">
      {isOpen && (
        <div className="whatsapp-menu">
          {agents.map((agent, index) => {
            // 🔹 Generar código único con prefijo WA-
            const whatsappCode = `WA-${agent.number}`;
            // 🔹 Armar mensaje con código al final
            const messageWithCode = `${agent.message} (Código: ${whatsappCode})`;

            return (
              <a
                key={index}
                href={`https://wa.me/${agent.number}?text=${encodeURIComponent(messageWithCode)}&source=whatsapp&code=${whatsappCode}`}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-agent btn btn-success"
                onClick={() => handleWhatsAppClick(agent.name, agent.number, whatsappCode)} // 👈 Se dispara evento aquí con el código
              >
                <i className="bi bi-whatsapp me-2"></i>{agent.name}
              </a>
            );
          })}
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
