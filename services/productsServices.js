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

const addNewProduct = async ({ name, quantity }) => {
  const productExistsOnDB = await ProductsModels.getProductByName(name);
  if (productExistsOnDB) return ({ statusCode: 409, message: 'Product already exists' });
  const newProduct = await ProductsModels.addNewProduct({ name, quantity });
  return { statusCode: 201, newProduct };
};

const updateProductById = async ({ id, name, quantity }) => {
  const productExistsOnDB = await ProductsModels.getProductById(id);
  console.log('camada service exist:', productExistsOnDB);
  if (!productExistsOnDB) return ({ statusCode: 404, message: 'Product not found' });
  const productUpdated = await ProductsModels.updateProductById({ id, name, quantity });
  console.log('camada service update:', productUpdated);
  return { statusCode: 200, productUpdated };
};

module.exports = {
  getAllProducts,
  getProductById,
  addNewProduct,
  updateProductById,
};