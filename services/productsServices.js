const ProductsModels = require('../models/productsModels');

const getAllProducts = async () => {
  const [products] = await ProductsModels.getAllProducts();
  return products;
};

const getProductById = async (id) => {
  const product = await ProductsModels.getProductById(id);
  console.log('camada service', product);
  if (product.length === 0) return false;
  return product;
};

module.exports = {
  getAllProducts,
  getProductById,
};