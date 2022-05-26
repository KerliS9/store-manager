const express = require('express');

const routes = express.Router();

const ProductsControllers = require('../controllers/productsControllers');
const SalesControllers = require('../controllers/salesControllers');

/* routes.get('/', (req, res) => {
  return res.status(200).json('rota de products');
}); */

routes.get('/', ProductsControllers.getAllProducts);
routes.get('/:id', ProductsControllers.getProductById);

routes.get('/', SalesControllers.getAllSales);

module.exports = routes;