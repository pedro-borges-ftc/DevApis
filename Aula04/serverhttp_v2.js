// server.mjs
import { createServer } from 'node:http';

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Olá mundo!\n');
  console.log('Devolvendo resposta para o cliente: ' + req.client.remoteAddress);
});

// starts a simple http server locally on port 5000
server.listen(5000, '127.0.0.1', () => {
  console.log('Ouvindo as requisições no ip 127.0.0.1, porta 5000');
});

// run with `node server.mjs`