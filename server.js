// server.js
import express from 'express';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Habilitar compresión
app.use(compression({
  level: 11, // Máxima compresión
  filter: (req, res) => {
    // Excluir compresión para ciertos recursos
    if (req.path.endsWith('.jpg') || req.path.endsWith('.png')) {
      return false;
    }
    return compression.filter(req, res);
  }
}));

// 2. Configurar caché para archivos estáticos
const staticOptions = {
  maxAge: '1y',
  immutable: true,
  setHeaders: (res, filePath) => {
    const fileExt = path.extname(filePath);
    
    // Configuraciones específicas por tipo de archivo
    if (fileExt === '.html') {
      res.setHeader('Cache-Control', 'public, max-age=0');
    }
    else if (fileExt === '.js' || fileExt === '.css') {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
  }
};

// 3. Servir archivos estáticos de Vite
app.use(express.static(path.join(__dirname, 'dist'), staticOptions));

// 4. Manejar todas las rutas para SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'), {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    }
  });
});

// 5. Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor funcionando en: http://localhost:${PORT}`);
  console.log(`⚡ Modo: ${process.env.NODE_ENV || 'development'}`);
});