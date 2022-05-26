const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../db/connection');
const SalesModels = require('../../../models/salesModels');
const { sales } = require('../../../const/mockForTest');

describe('Check Models Sales: get sale by id from database', () => {
  describe('when there is a sale that match with the id in the database', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(sales);
    });
    after(() => {
      connection.execute.restore();
    });

    it('should be an object', async () => {
      const response = await SalesModels.getSaleById(1);
      // console.log('teste model', response);
      expect(response).to.be.an('object');
    });
    it('the object should have the keys id, date', async () => {
      const response = await SalesModels.getSaleById(1);
      expect(response).to.include.all.keys('id', 'date');
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
    it('should return false', async () => {
      const response = await SalesModels.getSaleById(1);
      expect(response).to.be.false;
    })
  })
})