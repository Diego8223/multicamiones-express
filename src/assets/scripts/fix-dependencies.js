// Agrega al final del archivo existente
const net = require('net');

console.log('\n🔍 Buscando puerto disponible...');
const PORT = 3000;

const isPortFree = (port) => {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once('error', () => resolve(false));
    server.once('listening', () => {
      server.close(() => resolve(true));
    });
    server.listen(port, '127.0.0.1');
  });
};

const findAvailablePort = async (startPort) => {
  let port = startPort;
  while (port < startPort + 100) {
    if (await isPortFree(port)) return port;
    port++;
  }
  return null;
};

(async () => {
  const availablePort = await findAvailablePort(3000);
  if (!availablePort) {
    console.error('❌ No se encontró ningún puerto disponible');
    return;
  }

  console.log(`🚪 Puerto ${availablePort} disponible!`);
  console.log('🚀 Iniciando servidor de desarrollo...');
  
  execSync(`npx vite --port ${availablePort} --host localhost`, { 
    stdio: 'inherit' 
  });
})();