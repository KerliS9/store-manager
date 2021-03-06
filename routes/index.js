const express = require('express');

const productsRoutes = express.Router();
const salesRoutes = express.Router();

const ProductsControllers = require('../controllers/productsControllers');
const SalesControllers = require('../controllers/salesControllers');

const { validateProduct, validateSale } = require('../middlewares/validateDateForPost');

productsRoutes.get('/', ProductsControllers.getAllProducts);
productsRoutes.get('/:id', ProductsControllers.getProductById);
productsRoutes.post('/', validateProduct, ProductsControllers.addNewProduct);
productsRoutes.put('/:id', validateProduct, ProductsControllers.updateProductById);
productsRoutes.delete('/:id', ProductsControllers.deleteProductById);

salesRoutes.get('/', SalesControllers.getAllSales);
salesRoutes.get('/:id', SalesControllers.getSaleById);
salesRoutes.post('/', validateSale, SalesControllers.addNewSale);
salesRoutes.put('/:id', validateSale, SalesControllers.updateSaleById);
salesRoutes.delete('/:id', SalesControllers.deleteSaleById);

module.exports = {
  productsRoutes,
  salesRoutes,
};