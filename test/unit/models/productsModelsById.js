const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../db/connection');
const ProductsModels = require('../../../models/productsModels');
const { productId } = require('../../../const/mockForTest');

describe('Check Models: get product by id from database', () => {
  describe('when there is a product that match with the id in the database', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(productId);
    });
    after(() => {
      connection.execute.restore();
    });

    it('should be an object', async () => {
      const response = await ProductsModels.getProductById(1);
      console.log('teste model', response);
      expect(response[0]).to.be.an('object');
    });
    it('the object should have the keys id, name, quantity', async () => {
      const response = await ProductsModels.getProductById(1);
      expect(response[0]).to.include.all.keys('id', 'name', 'quantity');
    });
    it('object should not to be empty', async () => {
      const response = await ProductsModels.getProductById(1);
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
    it('should return false', async () => {
      const response = await ProductsModels.getProductById();
      expect(response).to.be.false;
    })
  })
})