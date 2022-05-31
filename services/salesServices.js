const SalesModels = require('../models/salesModels');

const getAllSales = async () => {
  const sales = await SalesModels.getAllSales();
  return sales;
};

const getSaleById = async (id) => {
  const sale = await SalesModels.getSaleById(id);
  if (!sale) return null;
  return sale;
};

const addNewSale = async (sale) => {
  const { id } = await SalesModels.addNewSale();
  // console.log('camada service id da venda', id);
  // console.log('camada service params', sale);
  const insertProductsSold = [];
  await Promise.all(sale.map(({ productId, quantity }) => (
    insertProductsSold.push(SalesModels.addProductSold({ id, productId, quantity }))
    )));

  return {
    statusCode: 201,
    data: {
      id,
      itemsSold: sale,
    },
  };
};

// const saleUpdated = await SalesModels.updateSaleById({ id, productId, quantity });
const updateSaleById = async ({ id }, sale) => {
  const saleUpdated = await Promise.all(sale.map(({ productId, quantity }) => (
    SalesModels.updateSaleById({ id, productId, quantity }))));
    // console.log('service', saleUpdated);
    return {
      statusCode: 200,
      data: {
        saleId: id,
        itemUpdated: saleUpdated,
      } };
    };
    
const deleteSaleById = async ({ id }) => {
  const saleExistOnDB = await SalesModels.getSaleById(id);
  // console.log('service venda existe', saleExistOnDB);
  if (!saleExistOnDB) return ({ statusCode: 404, message: 'Sale not found' });
  await SalesModels.deleteSaleById({ id });
  return { statusCode: 204 };
};

module.exports = {
  getAllSales,
  getSaleById,
  addNewSale,
  updateSaleById,
  deleteSaleById,
};
