const express = require('express');
const app = require('./app');
const { errorHandler } = require('./middlewares/errorHandler');
const { productsRoutes, salesRoutes } = require('./routes');
require('dotenv').config();

app.use(express.json());

app.use('/products', productsRoutes);
app.use('/sales', salesRoutes);

app.use(errorHandler);

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto
app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
