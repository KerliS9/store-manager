const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../db/connection');
const ProductsModels = require('../../../models/productsModels');
const { products } = require('../../../const/mockForTest');

describe('Check Models: get all products from db', () => {
  describe('when there are products in the database', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(products);
    });
    after(() => {
      connection.execute.restore();
    });

    it('should return an array', async () => {
      const response = await ProductsModels.getAllProducts();
      expect(response).to.be.an('array');
    });
    it('array should not to be empty', async () => {
      const response = await ProductsModels.getAllProducts();
      expect(response).to.not.be.empty;
    });
    it('should be an object', async () => {
      const [response] = await ProductsModels.getAllProducts();
      expect(response).to.be.an('object');
    });
    it('the object should have the keys id, name, quantity', async () => {
      const [response] = await ProductsModels.getAllProducts();
      expect(response).to.include.all.keys('id', 'name', 'quantity');
    })
  })

  describe('when there is no product in the database', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([[]]);
    });
    after(() => {
      connection.execute.restore();
    })
    it('should return an empty array', async () => {
      const [response] = await ProductsModels.getAllProducts();
      expect(response).to.be.empty;
      expect(response).to.be.an('array');
    })
  })
})