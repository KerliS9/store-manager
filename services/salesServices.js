const SalesModels = require('../models/salesModels');

const getAllSales = async () => {
  const sales = await SalesModels.getAllSales();
  return sales;
};

/* const getProductById = async (id) => {
  const product = await ProductsModels.getProductById(id);
  // console.log('camada service', product);
  if (!product) return null;
  return product;
};
 */
module.exports = {
  getAllSales,
  // getProductById,
};