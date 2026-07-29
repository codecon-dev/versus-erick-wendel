const express = require('express');
const expressBatchRequests = require('express-batch-requests');
const app = express();
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

app.use(express.json());

var batch = {
  total: 100,
  sold: 10,
};

var available = batch.total - batch.sold;

app.post('/express', expressBatchRequests);

app.post('/reservations', (req, res) => {
  if (req.body.cpf == null) {
    res.send("Por favor adicione um CPF na requisição");
  };
  if (req.body.quantity == null) {
    res.send("Adicione uma quantidade de ingressos na requisição")
  };
  if (ingressos == 0) {
    res.json({
      error
    })
  }
})
