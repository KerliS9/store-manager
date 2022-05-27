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
const addNewSale = async ({ productId, quantity }) => {
  const querySale = 'INSERT INTO StoreManager.sales(date) VALUES(NOW());';
  console.log('camada model Sales', querySale);
  const query = `INSERT INTO StoreManager.sales_products(sale_id, product_id, quantity)
  VALUES(last_insert_id(), ?, ?);`;
  const sale = await connection.execute(querySale);
  console.log('camada model Sales-Products:', sale);
  const [{ insertId }] = await connection.execute(query, [productId, quantity]);
  console.log('retorno das querys: ', { id: insertId, productId, quantity });
  return { id: insertId, productId, quantity };
};

module.exports = {
  getAllSales,
  getSaleById,
  addNewSale,
};