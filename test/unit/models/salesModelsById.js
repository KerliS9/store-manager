const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../db/connection');
const SalesModels = require('../../../models/salesModels');
const { salesById } = require('../../../const/mockForSales');

describe('Check Sales Models GET: get sale by id from database', () => {
  describe('when there is a sale that match with the id in the database', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(salesById);
    });
    after(() => {
      connection.execute.restore();
    });

    it('should be an array', async () => {
      const response = await SalesModels.getSaleById(1);
      expect(response).to.be.an('array');
    });
    it('the object should have the keys date, productId, quantity', async () => {
      const response = await SalesModels.getSaleById(1);
      expect(response[0]).to.include.all.keys('date', 'productId', 'quantity');
    });
    it('object should not to be empty', async () => {
      const response = await SalesModels.getSaleById(1);
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
    it('should return empty', async () => {
      const response = await SalesModels.getSaleById(1);
      expect(response).to.be.empty;
    })
  })
})