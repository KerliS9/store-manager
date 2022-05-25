const express = require('express');

const routes = express.Router();

const ProductsControllers = require('../controllers/productsControllers');

/* routes.get('/', (req, res) => {
  return res.status(200).json('rota de products');
}); */

routes.get('/', ProductsControllers.getAllProducts);

module.exports = routes;