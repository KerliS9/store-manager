const connection = require('../db/connection');

const getAllSales = async () => {
  const query = `SELECT SP.sale_id AS saleId, S.date, SP.product_id AS productId, SP.quantity 
FROM StoreManager.sales_products AS SP 
    INNER JOIN StoreManager.sales AS S 
    ON SP.sale_id = S.id
    ORDER BY SP.sale_id, SP.product_id;`;
  const [sales] = await connection.execute(query);
  return sales;
};

const getSaleById = async (id) => {
  const query = `SELECT S.date, SP.product_id AS productId, SP.quantity 
FROM StoreManager.sales_products AS SP 
    INNER JOIN StoreManager.sales AS S 
    ON SP.sale_id = S.id
    WHERE SP.sale_id = ?
    ORDER BY SP.sale_id, SP.product_id;`;
  const [sale] = await connection.execute(query, [id]);
  if (sale.length === 0) return false;
  return sale;
};

const addNewSale = async () => {
  const querySale = 'INSERT INTO StoreManager.sales VALUES();';
  const [{ insertId }] = await connection.execute(querySale);
  // console.log('camada model id de uma venda', insertId);
  return { id: insertId };
};

const addProductSold = async ({ id, productId, quantity }) => {
  // const teste = await addNewSale();
  const query = `INSERT INTO StoreManager.sales_products(sale_id, product_id, quantity)
  VALUES(?, ?, ?);`;
  // console.log('camada model Sales-Products:', id, productId, quantity);
  // const [{ insertId }] = 
  await connection.execute(query, [id, productId, quantity]);
  // console.log('Model retorno array dos produtos vendidos: ', { id, productId, quantity });
  // return { id: insertId, productId, quantity };
};

const updateSaleById = async ({ id, productId, quantity }) => {
  console.log('model params', id, productId, quantity);
  const query = `UPDATE StoreManager.sales_products SET product_id = ?, quantity = ?
  WHERE sale_id = ?;`;
  await connection.execute(query, [productId, quantity, id]);
  return { id, productId, quantity };
};

module.exports = {
  getAllSales,
  getSaleById,
  addNewSale,
  addProductSold,
  updateSaleById,
};

/* const updateProductById = async ({ id, name, quantity }) => {
  // console.log('camada model params:', id);
  const query = 'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?;';
  await connection.execute(query, [name, quantity, id]);
  // console.log('camada model', { id, name, quantity });
  return { id, name, quantity };
}; */