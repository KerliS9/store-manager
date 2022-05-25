const ProductsModels = require('../models/productsModels');

const getAllProducts = async () => {
  const [products] = await ProductsModels.getAllProducts();
  console.log('model service', products);
  return products;
};

module.exports = {
  getAllProducts,
};