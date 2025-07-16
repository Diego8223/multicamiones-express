// server.js
const express = require('express');
const app = express();
const fs = require('fs');

// Configura el header XML para el sitemap
app.get('/sitemap.xml', (req, res) => {
  res.set('Content-Type', 'application/xml');
  res.send(fs.readFileSync('sitemap.xml', 'utf8'));
});

// Sirve tu sitio estático (si tienes HTML/CSS/JS)
app.use(express.static('public'));

app.listen(3000, () => console.log('Servidor listo en puerto 3000'));