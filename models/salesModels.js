const connection = require('../db/connection');

const getAllSales = async () => {
  const query = 'SELECT * FROM StoreManager.sales;';
  const [sales] = await connection.execute(query);
  return sales;
};

/* const getProductById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?;';
  const [product] = await connection.execute(query, [id]);
  // console.log('camada model', product[0]);
  if (product.length === 0) return false;
  return product[0];
}; */

module.exports = {
  getAllSales,
  // getProductById,
};