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
  console.log('camada model Sales', insertId);
  return { id: insertId };
};

const addProductSold = async ({ saleId, productId, quantity }) => {
  // const teste = await addNewSale();
  const query = `INSERT INTO StoreManager.sales_products(sale_id, product_id, quantity)
  VALUES(?, ?, ?);`;
  // console.log('camada model Sales-Products:', teste);
  // const [{ insertId }] = 
  await connection.execute(query, [saleId, productId, quantity]);
  console.log('retorno das querys: ', { saleId, productId, quantity });
  // return { id: insertId, productId, quantity };
};

module.exports = {
  getAllSales,
  getSaleById,
  addNewSale,
  addProductSold,
};