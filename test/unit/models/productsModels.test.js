const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../db/connection');
const ProductsModels = require('../../../models/productsModel');
const { products } = require('../../../const/mockForTest');

describe('Get all products from db', () => {
  describe('when there are products in the db', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(products);
    });
    after(() => {
      connection.execute.restore();
    });

    it('should return an array', async () => {
      const response = await ProductsModels.getAllProducts();
      expect(response).to.be.an('array');
    })
    it('array should not to be empty', async () => {
      const response = await ProductsModels.getAllProducts();
      expect(response).to.not.be.empty;
    })
  })
})