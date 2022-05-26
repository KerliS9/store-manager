const connection = require('../db/connection');

const getAllProducts = () => {
  const query = 'SELECT * FROM StoreManager.products;';
  return connection.execute(query);
};

const getProductById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?;';
  const [product] = await connection.execute(query, [id]);
  // console.log('camada model', product[0]);
  if (product.length === 0) return false;
  return product[0];
};

module.exports = {
  getAllProducts,
  getProductById,
};