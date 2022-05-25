const ProductsServices = require('../services/productsServices');

const getAllProducts = (_req, res) => {
  const products = ProductsServices.getAllProducts();
  return res.status(200).json(products);
};

module.exports = {
  getAllProducts,
};