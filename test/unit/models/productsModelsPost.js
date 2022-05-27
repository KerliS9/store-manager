const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../db/connection');
const ProductsModels = require('../../../models/productsModels');
const { productPayload } = require('../../../const/mockForTest');

describe('Check Models Post: insert product on database', () => {
  describe('when the insertion happens successfully', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(productPayload);
    });
    after(() => {
      connection.execute.restore();
    });

    it('should be an object', async () => {
      const response = await ProductsModels.addNewProduct();
      // console.log('teste model', response);
      expect(response).to.be.an('object');
    });
    it('the object should have the keys id, name, quantity', async () => {
      const response = await ProductsModels.addNewProduct();
      expect(response).to.include.all.keys('id', 'name', 'quantity');
    });
    it('object should not to be empty', async () => {
      const response = await ProductsModels.addNewProduct();
      expect(response).to.not.be.empty;
    });
  });

  /* describe('when product already exists on database', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([[]]);
    });
    after(() => {
      connection.execute.restore();
    })
    it('should return false', async () => {
      const response = await ProductsModels.addNewProduct();
      expect(response).to.be.false;
    })
  }) */
})