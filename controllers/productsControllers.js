const ProductsServices = require('../services/productsServices');

const getAllProducts = async (_req, res) => {
  const products = await ProductsServices.getAllProducts();
  return res.status(200).json(products);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await ProductsServices.getProductById(id);
  if (product === null) return res.status(404).json({ message: 'Product not found' });
  return res.status(200).json(product);
};

const addNewProduct = async (req, res, next) => {
  const { name, quantity } = req.body;
  const { statusCode, message, newProduct } = await ProductsServices.addNewProduct({ 
    name, quantity });
  console.log('camada controller', newProduct);
  if (message) {
    return next({ statusCode, message });
  }
  return res.status(statusCode).json(newProduct);
};

module.exports = {
  getAllProducts,
  getProductById,
  addNewProduct,
};