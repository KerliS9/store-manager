const express = require('express');
const app = require('./app');
const { errorHandler } = require('./middlewares/errorHandler');
const routes = require('./routes');
require('dotenv').config();

app.use(express.json());

app.use('/products', routes);
app.use('/sales', routes);

app.use(errorHandler);

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto
app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
