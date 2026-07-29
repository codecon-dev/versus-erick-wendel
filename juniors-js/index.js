const http = require('node:http');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify({ status: 'ok' }));
});

// O '0.0.0.0' é obrigatório — sem ele o container sobe mas não responde de fora.
server.listen(PORT, '0.0.0.0', () => {
  console.log(`ouvindo na porta ${PORT}`);
});
