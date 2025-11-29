import express from 'express';

const app = express();
const port = 3000;

// Rota raiz /
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
