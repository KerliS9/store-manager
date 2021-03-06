const ProductsModels = require('../models/productsModels');

const getAllProducts = async () => {
  const [products] = await ProductsModels.getAllProducts();
  return products;
};

const getProductById = async (id) => {
  const product = await ProductsModels.getProductById(id);
  if (product.length === 0) return ({ statusCode: 404, message: 'Product not found' });
  return { statusCode: 200, product };
};

const addNewProduct = async ({ name, quantity }) => {
  const productExistsOnDB = await ProductsModels.getProductByName(name);
  if (productExistsOnDB !== undefined) {
    return ({ statusCode: 409, message: 'Product already exists' });
  }
  const newProduct = await ProductsModels.addNewProduct({ name, quantity });
  return { statusCode: 201, newProduct };
};

const updateProductById = async ({ id, name, quantity }) => {
  const productExistsOnDB = await ProductsModels.getProductById(id);
  if (productExistsOnDB.length === 0) return ({ statusCode: 404, message: 'Product not found' });
  const productUpdated = await ProductsModels.updateProductById({ id, name, quantity });
  return { statusCode: 200, productUpdated };
};

const deleteProductById = async ({ id }) => {
  const productExistsOnDB = await ProductsModels.getProductById(id);
  if (productExistsOnDB.length === 0) return ({ statusCode: 404, message: 'Product not found' });
  await ProductsModels.deleteProductById({ id });
  return { statusCode: 204 };
};

module.exports = {
  getAllProducts,
  getProductById,
  addNewProduct,
  updateProductById,
  deleteProductById,
};