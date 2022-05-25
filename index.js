const express = require('express');
const app = require('./app');
const routes = require('./routes');
require('dotenv').config();

app.use(express.json());

app.use('/products', routes);

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto
app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
