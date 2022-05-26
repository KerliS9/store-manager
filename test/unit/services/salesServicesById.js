const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../db/connection');
const SalesModels = require('../../../models/salesModels');
const SalesService = require('../../../services/salesServices');
const { salesById } = require('../../../const/mockForTest');

describe('Check Services Sales: get sale by id from database', () => {
  describe('when there is a sale that match with the id in the database', () => {
    before(() => {
      sinon.stub(SalesModels, 'getSaleById').resolves(salesById);
    });
    after(() => {
      SalesModels.getSaleById.restore();
    });

    it('should be an object', async () => {
      const [response] = await SalesService.getSaleById(1);
      // console.log('teste service', response);
      expect(response[0]).to.be.an('object');
    });
    it('the object should have the keys date, productId, quantity', async () => {
      const [response] = await SalesService.getSaleById(1);
      expect(response[0]).to.include.all.keys('date', 'productId', 'quantity');
    });
    it('object should not to be empty', async () => {
      const [response] = await SalesService.getSaleById(1);
      expect(response[0]).to.not.be.empty;
    });
  })

  describe('when there is no sale in the database', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([[]]);
    });
    after(() => {
      connection.execute.restore();
    })
    it('should return null', async () => {
      const response = await SalesService.getSaleById(1);
      // console.log('teste product ', response);
      expect(response).to.be.null;
    })
  })
})