const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../db/connection');
const ProductsModels = require('../../../models/productsModels');

describe('Check Products Models Delete: delete product from database', () => {
  describe('when deleting happens successfully', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([]);
    });
    after(() => {
      connection.execute.restore();
    });
    it('should be an array', async () => {
      const response = await ProductsModels.deleteProductById(1);
      expect(response).to.be.an('array');
    });
    it('object should be empty', async () => {
      const response = await ProductsModels.deleteProductById(1);
      expect(response).to.be.empty;
    });
  });
})