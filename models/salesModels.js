const connection = require('../db/connection');

const getAllSales = async () => {
  const query = 'SELECT * FROM StoreManager.sales;';
  const [sales] = await connection.execute(query);
  return sales;
};

const getSaleById = async (id) => {
  const query = 'SELECT * FROM StoreManager.sales WHERE id = ?;';
  const [sale] = await connection.execute(query, [id]);
  // console.log('camada model', sale[0]);
  if (sale.length === 0) return false;
  return sale[0];
};

module.exports = {
  getAllSales,
  getSaleById,
};