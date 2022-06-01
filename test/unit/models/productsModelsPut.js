const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../db/connection');
const ProductsModels = require('../../../models/productsModels');
const { products } = require('../../../const/mockForTest');

describe('Check ProductsModels Put: update product by id in database', () => {
  describe('when there is a product that match with the id in the database', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(products);
    });
    after(() => {
      connection.execute.restore();
    });

    it('should be an object', async () => {
      const response = await ProductsModels.updateProductById(1);
      expect(response).to.be.an('object');
    });
    it('the object should have the keys id, name, quantity', async () => {
      const response = await ProductsModels.updateProductById(1);
      expect(response).to.include.all.keys('id', 'name', 'quantity');
    });
    it('object should not to be empty', async () => {
      const response = await ProductsModels.updateProductById(1);
      expect(response).to.not.be.empty;
    });
  })

  describe('when there is no product in the database', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([[]]);
    });
    after(() => {
      connection.execute.restore();
    })
    it('should return an empty array', async () => {
      const response = await ProductsModels.updateProductById(1);
      expect(response).to.be.empty;
    })
  })
})