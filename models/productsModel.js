const connection = require('../db/connection');

const getAllProducts = () => {
  const query = 'SELECT * FROM StoreManager.products;';
  return connection.execute(query);
};

module.exports = {
  getAllProducts,
};