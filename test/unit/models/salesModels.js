const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../db/connection');
const SalesModels = require('../../../models/salesModels');
const { sales } = require('../../../const/mockForSales');

describe('Check Sales Models GET: get all sales from database', () => {
  describe('when there are sales in the database', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(sales);
    });
    after(() => {
      connection.execute.restore();
    });

    it('should return an array', async () => {
      const response = await SalesModels.getAllSales();
      expect(response).to.be.an('array');
    });
    it('array should not to be empty', async () => {
      const response = await SalesModels.getAllSales();
      expect(response).to.not.be.empty;
    });
    it('should be an object', async () => {
      const response = await SalesModels.getAllSales();
      expect(response[0]).to.be.an('object');
    });
    it('the object should have the keys saleId, date, productId, quantity', async () => {
      const response = await SalesModels.getAllSales();
      expect(response[0]).to.include.all.keys('saleId', 'date', 'productId', 'quantity');
    })
  })
  
  describe('when there is no sale in the database', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([[]]);
    });
    after(() => {
      connection.execute.restore();
    })
    it('should return an empty array', async () => {
      const response = await SalesModels.getAllSales();
      expect(response).to.be.empty;
      expect(response).to.be.an('array');
    })
  })
})