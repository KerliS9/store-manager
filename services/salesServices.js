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
  // const newSale = await Promise.all(insertProductsSold);
  // console.log('camada service depois do map', sale);

  return {
    statusCode: 201,
    data: {
      id,
      itemsSold: sale,
    },
  };
};

const updateSaleById = async ({ id, productId, quantity }) => {
  const saleExistOnDB = await SalesModels.getSaleById(id);
  if (!saleExistOnDB) return ({ statusCode: 404, message: 'Sale not found' });
  const saleUpdated = await SalesModels.updateSaleById({ id, productId, quantity });
  console.log('service', saleUpdated);
  return { statusCode: 200, saleUpdated };
};

module.exports = {
  getAllSales,
  getSaleById,
  addNewSale,
  updateSaleById,
};

/* const updateProductById = async ({ id, name, quantity }) => {
  const productExistsOnDB = await ProductsModels.getProductById(id);
  // console.log('camada service exist:', productExistsOnDB);
  if (!productExistsOnDB) return ({ statusCode: 404, message: 'Product not found' });
  const productUpdated = await ProductsModels.updateProductById({ id, name, quantity });
  // console.log('camada service update:', productUpdated);
  return { statusCode: 200, productUpdated };
}; */