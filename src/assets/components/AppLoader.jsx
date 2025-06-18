// Corrección de la importación (ambos archivos están en la misma carpeta)
import { MapComponent } from "./MapComponent";

export class AppLoader {
  static init() {
    document.addEventListener('DOMContentLoaded', () => {
      try {
        new MapComponent();
      } catch (error) {
        console.error('Error al iniciar la aplicación:', error);
        AppLoader.showFatalError();
      }
    });
  }

  static showFatalError() {
    const errorContainer = document.createElement('div');
    errorContainer.innerHTML = `
      <div style="padding: 20px; color: #b91c1c; background: #fee2e2; border: 1px solid #fca5a5; border-radius: 8px; margin: 20px;">
        <h2>Error crítico</h2>
        <p>No se pudo cargar la aplicación. Por favor, recarga la página.</p>
      </div>
    `;
    document.body.prepend(errorContainer);
  }
}


if (import.meta.env.MODE !== 'test') {
  AppLoader.init();
}