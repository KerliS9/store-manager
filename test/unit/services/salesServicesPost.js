const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../db/connection');
const SalesModels = require('../../../models/salesModels');
const SalesServices = require('../../../services/salesServices');
const { salePayloadPost, saleResult } = require('../../../const/mockForTest');

describe('Check Sale Service Post: insert sale on database', () => {
  describe('when the insertion happens successfully', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
      sinon.stub(SalesModels, 'addProductSold').resolves(saleResult);
    });
    after(() => {
      connection.execute.restore();
      SalesModels.addProductSold.restore();
    });
    it('should return an id', async() => {
      const {id} = await SalesModels.addNewSale();
      console.log('name on service', id);
      expect(id).to.be.a('number');
    })

    it('should be an object', async () => {
      const response = await SalesServices.addNewSale(salePayloadPost);
      // salePayloadPost.map()
      console.log('teste service', response);
      expect(response).to.be.an('object');
    });
    it('the object should have the keys id, productId, quantity', async () => {
      const { newProduct } = await SalesServices.addNewSale(salePayloadPost);
      console.log('teste service keys', newProduct);
      expect(newProduct).to.include.all.keys('id', 'productId', 'quantity');
    });
    it('object should not to be empty', async () => {
      const { newProduct } = await SalesServices.addNewSale(salePayloadPost);
      console.log('teste service not empty', newProduct);
      expect(newProduct).to.not.be.empty;
    });
  });
})