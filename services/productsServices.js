const ProductsModels = require('../models/productsModels');

const getAllProducts = async () => {
  const [products] = await ProductsModels.getAllProducts();
  // console.log('service', products);
  return products;
};

const getProductById = async (id) => {
  const product = await ProductsModels.getProductById(id);
  console.log('service', product);
  // if (!product) return null;
  if (!product) return ({ statusCode: 404, message: 'Product not found' });
  // return product;
  return { statusCode: 200, product };
};

const addNewProduct = async ({ name, quantity }) => {
  const productExistsOnDB = await ProductsModels.getProductByName(name);
  // console.log('service nome do produto', typeof productExistsOnDB);
  if (productExistsOnDB !== undefined) {
    return ({ statusCode: 409, message: 'Product already exists' });
  }
  const newProduct = await ProductsModels.addNewProduct({ name, quantity });
  // console.log('service', newProduct);
  return { statusCode: 201, newProduct };
};

const updateProductById = async ({ id, name, quantity }) => {
  const productExistsOnDB = await ProductsModels.getProductById(id);
  // console.log('camada service exist:', productExistsOnDB);
  if (!productExistsOnDB) return ({ statusCode: 404, message: 'Product not found' });
  const productUpdated = await ProductsModels.updateProductById({ id, name, quantity });
  // console.log('camada service update:', productUpdated);
  return { statusCode: 200, productUpdated };
};

const deleteProductById = async ({ id }) => {
  const productExistsOnDB = await ProductsModels.getProductById(id);
  console.log('camada service exist:', productExistsOnDB);
  if (!productExistsOnDB) return ({ statusCode: 404, message: 'Product not found' });
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