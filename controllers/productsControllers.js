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

const addNewProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await ProductsServices.addNewProduct({ name, quantity });
  if (newProduct) return res.status(409).json({ message: 'Product already exists' });
  return res.status(201).json(newProduct);
};

module.exports = {
  getAllProducts,
  getProductById,
  addNewProduct,
};