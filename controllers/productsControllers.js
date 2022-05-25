const ProductsServices = require('../services/productsServices');

const getAllProducts = async (_req, res) => {
  const products = await ProductsServices.getAllProducts();
  // console.log('controller', products);
  return res.status(200).json(products);
};

module.exports = {
  getAllProducts,
};