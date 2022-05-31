const SalesServices = require('../services/salesServices');

const getAllSales = async (_req, res) => {
  const sales = await SalesServices.getAllSales();
  return res.status(200).json(sales);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const sale = await SalesServices.getSaleById(id);
  if (sale === null) return res.status(404).json({ message: 'Sale not found' });
  return res.status(200).json(sale);
};

const addNewSale = async (req, res, next) => {
  const { statusCode, message, data } = await SalesServices.addNewSale(req.body);
  console.log('controller retorno do service produtos vendidos: ', statusCode, message, data);
  if (message) {
    return next({ statusCode, message });
  }
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
