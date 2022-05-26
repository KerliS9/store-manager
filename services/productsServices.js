const ProductsModels = require('../models/productsModels');

const getAllProducts = async () => {
  const [products] = await ProductsModels.getAllProducts();
  // console.log('camada service', products);
  return products;
};

module.exports = {
  getAllProducts,
};