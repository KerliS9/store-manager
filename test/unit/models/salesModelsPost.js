const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../db/connection');
const SalesModels = require('../../../models/salesModels');
const { salePayload, saleResult } = require('../../../const/mockForTest');

describe('Check Sales Models Post: insert product on database', () => {
  describe('when the insertion happens successfully', () => {
    before(() => {
      const callbackExecute = sinon.stub(connection, 'execute');
      callbackExecute.onCall(0).resolves([{ insertId: 1 }]);
      callbackExecute.onCall(1).resolves(saleResult);
      callbackExecute.onCall(2).resolves(saleResult);
      callbackExecute.onCall(3).resolves(saleResult);
    });
    after(() => {
      connection.execute.restore();
    });
    it('should return an id', async() => {
      const { id } = await SalesModels.addNewSale();
      // console.log('name', id);
      expect(id).to.be.a('number');
    })

    it('should be an object', async () => {
      const response = await SalesModels.addProductSold(salePayload);
      // console.log('teste model', response);
      expect(response).to.be.an('object');
    });
    it('the object should have the keys id, productId, quantity', async () => {
      const response = await SalesModels.addProductSold(salePayload);
      // console.log('teste model', response);
      expect(response).to.include.all.keys('id', 'productId', 'quantity');
    });
    it('object should not to be empty', async () => {
      const response = await SalesModels.addProductSold(salePayload);
      // console.log('teste model', response);
      expect(response).to.not.be.empty;
    });
  });
})