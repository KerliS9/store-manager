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

/* const updateDBOnSale = async (sale) => {
  const update = await Promise.all(sale.map(async (s) => {
    const productDetails = await ProductsModels.getProductById(s.productId);
    const quantity = productDetails.quantity - s.quantity;
    console.log('quantity', quantity);
    const { id, name } = productDetails;
    if (quantity < 0) return ({ statusCode: 422 });
    // {
      throw new Error({ statusCode: 422, message: 'Such amount is not permitted to sell' });
    } 
      await ProductsModels.updateProductById({ 
      id, name, quantity });
    // console.log('saldoAtualizado', saldoAtualizado);
    return productDetails;
  }));
  console.log('test function', update);
  if (update.find((u) => u.statusCode)) {
    return ({ statusCode: 422, message: 'Such amount is not permitted to sell' });
  }
  return update;
}; */
const addNewSale = async (sale) => {
  const { id: saleId } = await SalesModels.addNewSale();
  const update = await Promise.all(sale.map(async (s) => {
    const productDetails = await ProductsModels.getProductById(s.productId);
    const quantity = productDetails.quantity - s.quantity;
    console.log('quantity', quantity);
    const { id, name } = productDetails;
    if (quantity < 0) return ({ statusCode: 422 });
      await ProductsModels.updateProductById({ 
      id, name, quantity });
    // console.log('saldoAtualizado', saldoAtualizado);
    return productDetails;
  }));
  // const update = await updateDBOnSale(sale);
  if (update.find((u) => u.statusCode)) {
    return ({ statusCode: 422, message: 'Such amount is not permitted to sell' });
  }
  // console.log('test', update);
  await Promise.all(sale.map(({ productId, quantity }) => (
    SalesModels.addProductSold({ saleId, productId, quantity })
  )));
    return { statusCode: 201, data: { id: saleId, itemsSold: sale } };
};

const updateSaleById = async ({ id: saleId }, productsSale) => {
  // await updateDBOnSale(productsSale);
  const saleUpdated = await Promise.all(productsSale.map(({ productId, quantity }) => (
    SalesModels.updateSaleById({ saleId, productId, quantity }))));
    // console.log('service', saleUpdated);
    return {
      statusCode: 200,
      data: {
        saleId,
        itemUpdated: saleUpdated,
      } };
    };
    
const deleteSaleById = async ({ id }) => {
  console.log('pa', id);
    const saleById = await SalesModels.getSaleById(id);
    console.log('saleById', saleById);
    /* const quantity = productDetails.quantity - s.quantity;
    const { id, name } = productDetails;
    if (quantity < 0) return ({ statusCode: 422, message: 'Such amount is not permitted to sell' });
      await ProductsModels.updateProductById({ 
      id, name, quantity });
    // console.log('saldoAtualizado', saldoAtualizado);
    return productDetails;
  })); */
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
