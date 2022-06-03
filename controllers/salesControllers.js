const SalesServices = require('../services/salesServices');

const getAllSales = async (_req, res) => {
  const sales = await SalesServices.getAllSales();
  return res.status(200).json(sales);
};

const getSaleById = async (req, res, next) => {
  const { id } = req.params;
  const { statusCode, message, sale } = await SalesServices.getSaleById(id);
  if (message) return next({ statusCode, message });
  return res.status(statusCode).json(sale);
};

const addNewSale = async (req, res, next) => {
  const { statusCode, data, message } = await SalesServices.addNewSale(req.body);
  if (message) return next({ statusCode, message });
  return res.status(statusCode).json(data);
};

const updateSaleById = async (req, res, next) => {
  const { statusCode, message, data } = await SalesServices.updateSaleById(req.params, req.body);
  if (message) return next({ statusCode, message });
  return res.status(statusCode).json(data);
};

const deleteSaleById = async (req, res, next) => {
  const { id } = req.params;
  const { statusCode, message } = await SalesServices.deleteSaleById({ id });
  console.log('controllers', statusCode, message);
  if (message) return next({ statusCode, message });
  return res.status(statusCode).send();
};

module.exports = {
  getAllSales,
  getSaleById,
  addNewSale,
  updateSaleById,
  deleteSaleById,
};
