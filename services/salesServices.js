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
  const saleId = await SalesModels.addNewSale();
  console.log('camada service', saleId);
  const insertProductsSold = [];
  sale.map(({ productId, quantity }) => (
    insertProductsSold.push(SalesModels.addProductSold({ productId, quantity }))
    ));
  const newSale = await Promise.all(insertProductsSold);
  console.log('camada service', newSale);

  return { statusCode: 201, newSale };
};

module.exports = {
  getAllSales,
  getSaleById,
  addNewSale,
};

/* const addNewProduct = async ({ name, quantity }) => {
  const productExistsOnDB = await ProductsModels.getProductByName(name);
  if (productExistsOnDB) return ({ statusCode: 409, message: 'Product already exists' });
  const newProduct = await ProductsModels.addNewProduct({ name, quantity });
  return { statusCode: 201, newProduct };
}; */