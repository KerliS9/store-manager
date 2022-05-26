const SalesModels = require('../models/salesModels');

const getAllSales = async () => {
  const sales = await SalesModels.getAllSales();
  return sales;
};

const getSaleById = async (id) => {
  const product = await SalesModels.getSaleById(id);
  // console.log('camada service', product);
  if (!product) return false;
  return product;
};

module.exports = {
  getAllSales,
  getSaleById,
};