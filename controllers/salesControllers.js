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

module.exports = {
  getAllSales,
  getSaleById,
  addNewSale,
};

/* const addNewProduct = async (req, res, next) => {
  const { name, quantity } = req.body;
  const { statusCode, message, newProduct } = await ProductsServices.addNewProduct({ 
    name, quantity,
  });
  if (message) {
    return next({ statusCode, message });
  }
  return res.status(statusCode).json(newProduct);
}; */