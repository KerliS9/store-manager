const SalesServices = require('../services/salesServices');

const getAllSales = async (_req, res) => {
  const sales = await SalesServices.getAllSales();
  return res.status(200).json(sales);
};

/* const getProductById = async (req, res) => {
  const { id } = req.params;
  // console.log('controller ', id);
  const product = await SalesServices.getProductById(id);
  // console.log('controller', product);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  return res.status(200).json(product);
}; */

module.exports = {
  getAllSales,
  // getProductById,
};