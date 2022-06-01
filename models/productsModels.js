const connection = require('../db/connection');

const getAllProducts = () => {
  const query = 'SELECT * FROM StoreManager.products;';
  return connection.execute(query);
};

const getProductById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?;';
  const [product] = await connection.execute(query, [id]);
  if (product.length === 0) return [];
  return product[0];
};

const getProductByName = async (name) => {
  const query = 'SELECT * FROM StoreManager.products WHERE name = ?;';
  const [product] = await connection.execute(query, [name]);
  return product[0];
};

const addNewProduct = async ({ name, quantity }) => {
  const query = 'INSERT INTO StoreManager.products(name, quantity) VALUES (?, ?);';
  const [{ insertId }] = await connection.execute(query, [name, quantity]);
  return { id: insertId, name, quantity };
};

const updateProductById = async ({ id, name, quantity }) => {
  // console.log('camada model params:', id);
  const query = 'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?;';
  await connection.execute(query, [name, quantity, id]);
  // console.log('camada model', { id, name, quantity });
  return { id, name, quantity };
};

const deleteProductById = async ({ id }) => {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?;';
  await connection.execute(query, [id]);
  return [];
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductByName,
  addNewProduct,
  updateProductById,
  deleteProductById,
};