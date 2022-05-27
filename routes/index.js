const express = require('express');

const productsRoutes = express.Router();
const salesRoutes = express.Router();

const ProductsControllers = require('../controllers/productsControllers');
const SalesControllers = require('../controllers/salesControllers');

const { validateProduct } = require('../middlewares/validateDateForPost');

/* routes.get('/', (req, res) => {
  return res.status(200).json('rota de products');
}); */

productsRoutes.get('/', ProductsControllers.getAllProducts);
productsRoutes.get('/:id', ProductsControllers.getProductById);
productsRoutes.post('/', validateProduct, ProductsControllers.addNewProduct);
productsRoutes.put('/:id', ProductsControllers.updateProductById);
productsRoutes.delete('/:id', ProductsControllers.deleteProductById);

salesRoutes.get('/', SalesControllers.getAllSales);
salesRoutes.get('/:id', SalesControllers.getSaleById);
// salesRoutes.post('/', validateSale);

module.exports = {
  productsRoutes,
  salesRoutes,
};