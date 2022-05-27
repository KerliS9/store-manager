const ProductsModels = require('../models/productsModels');

const getAllProducts = async () => {
  const [products] = await ProductsModels.getAllProducts();
  return products;
};

const getProductById = async (id) => {
  const product = await ProductsModels.getProductById(id);
  // console.log('camada service', product);
  if (!product) return null;
  return product;
};

const addNewProduct = async () => {
  const newProduct = await ProductsModels.addNewProduct();
  if (!newProduct) return false;
  return newProduct;
};

module.exports = {
  getAllProducts,
  getProductById,
  addNewProduct,
};