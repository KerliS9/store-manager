const SalesModels = require('../models/salesModels');
const ProductsModels = require('../models/productsModels');

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
  const { id: saleId } = await SalesModels.addNewSale();
  const update = await Promise.all(sale.map(async (s) => {
    const productDetails = await ProductsModels.getProductById(s.productId);
    const quantity = productDetails.quantity - s.quantity;
    const { id, name } = productDetails;
    if (quantity < 0) return ({ statusCode: 422 });
      await ProductsModels.updateProductById({ 
      id, name, quantity });
    return productDetails;
  }));
  if (update.find((u) => u.statusCode)) {
    return ({ statusCode: 422, message: 'Such amount is not permitted to sell' });
  }
  await Promise.all(sale.map(({ productId, quantity }) => (
    SalesModels.addProductSold({ saleId, productId, quantity })
  )));
    return { statusCode: 201, data: { id: saleId, itemsSold: sale } };
};

const updateSaleById = async ({ id: saleId }, productsSale) => {
  const saleUpdated = await Promise.all(productsSale.map(({ productId, quantity }) => (
    SalesModels.updateSaleById({ saleId, productId, quantity }))));
    return {
      statusCode: 200,
      data: {
        saleId,
        itemUpdated: saleUpdated,
      } };
    };
    
const deleteSaleById = async ({ id: saleId }) => {
  const saleExistOnDB = await SalesModels.getSaleById(saleId);
  if (saleExistOnDB.length === 0) return ({ statusCode: 404, message: 'Sale not found' });  
  await Promise.all(saleExistOnDB.map(async (p) => {
    const { name, id, quantity: qtd } = await ProductsModels.getProductById(p.productId);
    const quantity = qtd + p.quantity;
    await ProductsModels.updateProductById({ 
    id, name, quantity });
  }));
  await SalesModels.deleteSaleById({ saleId });
  return { statusCode: 204 };
};

module.exports = {
  getAllSales,
  getSaleById,
  addNewSale,
  updateSaleById,
  deleteSaleById,
};
