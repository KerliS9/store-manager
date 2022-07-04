const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJson = require('./const/swagger.json');
const { errorHandler } = require('./middlewares/errorHandler');
const { productsRoutes, salesRoutes } = require('./routes');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRoutes);
app.use('/sales', salesRoutes);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerJson));

app.use(errorHandler);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
