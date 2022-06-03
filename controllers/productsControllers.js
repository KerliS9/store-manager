const ProductsServices = require('../services/productsServices');

const getAllProducts = async (_req, res) => {
  const products = await ProductsServices.getAllProducts();
  return res.status(200).json(products);
};

const getProductById = async (req, res, next) => {
  const { id } = req.params;
  const { statusCode, message, product } = await ProductsServices.getProductById(id);
  if (message) {
    return next({ statusCode, message });
  }
  return res.status(statusCode).json(product);
};

const addNewProduct = async (req, res, next) => {
  const { name, quantity } = req.body;
  const { statusCode, message, newProduct } = await ProductsServices.addNewProduct({ 
    name, quantity,
  });
  if (message) {
    return next({ statusCode, message });
  }
  return res.status(statusCode).json(newProduct);
};

const updateProductById = async (req, res, next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const { statusCode, message, productUpdated } = await ProductsServices.updateProductById({
    id, name, quantity,
  });
  if (message) return next({ statusCode, message });
  return res.status(statusCode).json(productUpdated);
};

const deleteProductById = async (req, res, next) => {
  const { id } = req.params;
  const { statusCode, message } = await ProductsServices.deleteProductById({ id });
  if (message) return next({ statusCode, message });
  return res.status(statusCode).send();
};

module.exports = {
  getAllProducts,
  getProductById,
  addNewProduct,
  updateProductById,
  deleteProductById,
};