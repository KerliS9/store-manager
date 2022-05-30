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
  // const { productId, quantity } = req.body;
  const { statusCode, message, data } = await SalesServices.addNewSale(req.body);
  // { statusCode, message, data }
  // console.log('controller req.body produtos vendidos: ', statusCode, message, data);
  if (message) {
    return next({ statusCode, message });
  }
  return res.status(statusCode).json(data);
};

const updateSaleById = async (req, res, next) => {
  const { id } = req.params;
  const { productId, quantity } = req.body;
  const { statusCode, message, saleUpdated } = await SalesServices.updateSaleById({
    id, productId, quantity,
  });
  if (message) return next({ statusCode, message });
  return res.status(statusCode).json(saleUpdated);
};

module.exports = {
  getAllSales,
  getSaleById,
  addNewSale,
  updateSaleById,
};

/* const updateProductById = async (req, res, next) => {
  const { id } = req.params;
  // console.log('camada controllers id: ', id);
  const { name, quantity } = req.body;
  // console.log('camada controllers name, quantity: ', name, quantity);
  const { statusCode, message, productUpdated } = await ProductsServices.updateProductById({
    id, name, quantity,
  });
  if (message) return next({ statusCode, message });
  return res.status(statusCode).json(productUpdated);
}; */