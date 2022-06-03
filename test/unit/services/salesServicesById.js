const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../db/connection');
const SalesModels = require('../../../models/salesModels');
const SalesService = require('../../../services/salesServices');
const { sales } = require('../../../const/mockForSales');

describe('Check Sales Services GET: get sale by id from database', () => {
  describe('when there is a sale that match with the id in the database', () => {
    before(() => {
      sinon.stub(SalesModels, 'getSaleById').resolves(sales);
    });
    after(() => {
      SalesModels.getSaleById.restore();
    });

    it('should be an array', async () => {
      const { sale } = await SalesService.getSaleById(1);
      expect(sale[0]).to.be.an('array');
    });
    it('the object should have the keys date, productId, quantity', async () => {
      const { sale } = await SalesService.getSaleById(1);
      expect(sale[0][0]).to.include.all.keys('date', 'productId', 'quantity');
    });
    it('object should not to be empty', async () => {
      const { sale } = await SalesService.getSaleById(1);
      expect(sale[0][0]).to.not.be.empty;
    });
  })

  describe('when there is no sale in the database', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([[]]);
    });
    after(() => {
      connection.execute.restore();
    })
    it('should have the keys statusCode and message', async () => {
      const response = await SalesService.getSaleById(1);
      expect(response).to.include.all.keys('statusCode', 'message');
    })
  })
})