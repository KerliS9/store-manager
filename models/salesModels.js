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
  // console.log('camada model', sale[0]);
  if (sale.length === 0) return false;
  return sale;
};

module.exports = {
  getAllSales,
  getSaleById,
};