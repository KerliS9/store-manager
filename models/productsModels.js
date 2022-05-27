const connection = require('../db/connection');

const getAllProducts = () => {
  const query = 'SELECT * FROM StoreManager.products;';
  return connection.execute(query);
};

const getProductById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?;';
  const [product] = await connection.execute(query, [id]);
  if (product.length === 0) return false;
  return product[0];
};

const getProductByName = async (name) => {
  const query = 'SELECT * FROM StoreManager.products WHERE name = ?;';
  const [product] = await connection.execute(query, [name]);
  if (product.length === 0) return false;
  return product[0];
};

const addNewProduct = async ({ name, quantity }) => {
  console.log('model params', name);
  const query = 'INSERT INTO StoreManager.products(name, quantity) VALUES (?, ?);';
  const [{ insertId }] = await connection.execute(query, [name, quantity]);
  console.log('camada model', { id: insertId, name, quantity });
  return { id: insertId, name, quantity };
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductByName,
  addNewProduct,
};