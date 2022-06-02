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
  // console.log('sale', sale);
  const { id: saleId } = await SalesModels.addNewSale();
  // console.log('sale', saleId);
  // const productUpdated = 
  await Promise.all(sale.map(async (s) => {
    const productDetails = await ProductsModels.getProductById(s.productId);
    const quantity = productDetails.quantity - s.quantity;
    const { id, name } = productDetails;
    // console.log('newQtd', quantity);
    if (quantity < 0) return ({ statusCode: 404, message: 'erro' });
    // console.log('productDetails', { id, name, quantity });
    const saldoAtualizado = await ProductsModels.updateProductById({ 
      id, name, quantity });
    console.log('saldoAtualizado', saldoAtualizado);
    return productDetails;
  }));

  // console.log('ProductsModels.getProductById', productUpdated);
  /* const vendas =  */await Promise.all(sale.map(({ productId, quantity }) => {
    console.log('vend map', { saleId, productId, quantity });
    return SalesModels.addProductSold({ saleId, productId, quantity });
  }));
  // console.log('productUpdated', vendas);
    return {
      statusCode: 201, data: { id: saleId, itemsSold: sale },
    };
};

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
