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