const ProductsModels = require('../models/productsModels');

const getAllProducts = async () => {
  const [products] = await ProductsModels.getAllProducts();
  return products;
};

const getProductById = async (id) => {
  const product = await ProductsModels.getProductById(id);
  if (!product) return null;
  return product;
};

/* const getProductByName = async (name) => {
  if (!product) return null;
  return product;
}; */

const addNewProduct = async ({ name, quantity }) => {
  const productExistsOnDB = await ProductsModels.getProductByName(name);
  if (productExistsOnDB) return ({ statusCode: 409, message: 'Product already exists' });
  const newProduct = await ProductsModels.addNewProduct({ name, quantity });
  console.log('camada service', newProduct);
  return { statusCode: 201, newProduct };
};

module.exports = {
  getAllProducts,
  getProductById,
  addNewProduct,
};