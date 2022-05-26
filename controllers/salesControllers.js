const SalesServices = require('../services/salesServices');

const getAllSales = async (_req, res) => {
  const sales = await SalesServices.getAllSales();
  return res.status(200).json(sales);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const product = await SalesServices.getSaleById(id);
  // console.log('controller', product);
  if (!product) return res.status(404).json({ message: 'Sale not found' });
  return res.status(200).json(product);
};

module.exports = {
  getAllSales,
  getSaleById,
};