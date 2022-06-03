const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../db/connection');
const SalesModels = require('../../../models/salesModels');
const { salePayload } = require('../../../const/mockForSales');

describe('Check Sales Models PUT: update sale by id in database', () => {
  describe('when there is a sale that match with the id in the database', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(salePayload);
    });
    after(() => {
      connection.execute.restore();
    });

    it('should be an object', async () => {
      const response = await SalesModels.updateSaleById(salePayload);
      expect(response).to.be.an('object');
    });
    it('the object should have the keys productId, quantity', async () => {
      const response = await SalesModels.updateSaleById(salePayload);
      expect(response).to.include.all.keys('productId', 'quantity');
    });
    it('object should not to be empty', async () => {
      const response = await SalesModels.updateSaleById(salePayload);
      expect(response).to.not.be.empty;
    });
  })
})