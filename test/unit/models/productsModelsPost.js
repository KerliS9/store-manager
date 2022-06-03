const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../db/connection');
const ProductsModels = require('../../../models/productsModels');
const { productPayload } = require('../../../const/mockForTest');

const { name } = productPayload;

describe('Check Products Models POST: insert product on database', () => {
  describe('when the insertion happens successfully', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(name);
    });
    after(() => {
      connection.execute.restore();
    });
    it('should return an id', async() => {
      const response = await ProductsModels.getProductByName(name);
      expect(response).to.be.a('string');
    })

    it('should be an object', async () => {
      const response = await ProductsModels.addNewProduct(productPayload);
      expect(response).to.be.an('object');
    });
    it('the object should have the keys id, name, quantity', async () => {
      const response = await ProductsModels.addNewProduct(productPayload);
      expect(response).to.include.all.keys('id', 'name', 'quantity');
    });
    it('object should not to be empty', async () => {
      const response = await ProductsModels.addNewProduct(productPayload);
      expect(response).to.not.be.empty;
    });
  });
})
