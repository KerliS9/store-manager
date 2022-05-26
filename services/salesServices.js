const SalesModels = require('../models/salesModels');

const getAllSales = async () => {
  const sales = await SalesModels.getAllSales();
  return sales;
};

const getSaleById = async (id) => {
  const sale = await SalesModels.getSaleById(id);
  // console.log('camada service', sale);
  if (!sale) return false;
  return sale;
};

module.exports = {
  getAllSales,
  getSaleById,
};