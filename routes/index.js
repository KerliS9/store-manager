const express = require('express');

const productsRoutes = express.Router();
const salesRoutes = express.Router();

const ProductsControllers = require('../controllers/productsControllers');
const SalesControllers = require('../controllers/salesControllers');

/* routes.get('/', (req, res) => {
  return res.status(200).json('rota de products');
}); */

productsRoutes.get('/', ProductsControllers.getAllProducts);
productsRoutes.get('/:id', ProductsControllers.getProductById);

salesRoutes.get('/', SalesControllers.getAllSales);

module.exports = {
  productsRoutes,
  salesRoutes,
};