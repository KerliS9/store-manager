const sinon = require('sinon');
const { expect } = require('chai');
const SalesModels = require('../../../models/salesModels');
const SalesService = require('../../../services/productsServices');
const { sales } = require('../../../const/mockForTest');

describe('Check Services Sales: get sale by id from database', () => {
  describe('when there is a sale that match with the id in the database', () => {
    before(() => {
      sinon.stub(SalesModels, 'getSaleById').resolves(sales);
    });
    after(() => {
      SalesModels.getSaleById.restore();
    });

    it('should be an object', async () => {
      const [response] = await SalesService.getSaleById(1);
      // console.log('teste service', response);
      expect(response[0]).to.be.an('object');
    });
    it('the object should have the keys id, date', async () => {
      const [response] = await SalesService.getSaleById(1);
      expect(response[0]).to.include.all.keys('id', 'date');
    });
    it('object should not to be empty', async () => {
      const [response] = await SalesService.getSaleById(1);
      expect(response[0]).to.not.be.empty;
    });
  })

  describe('when there is no sale in the database', () => {
    before(() => {
      sinon.stub(SalesModels, 'getSaleById').resolves([[]]);
    });
    after(() => {
      SalesModels.getSaleById.restore();
    })
    it('should return false', async () => {
      const [response] = await SalesService.getSaleById(1);
      // console.log('teste product ', response);
      expect(response).to.be.empty;
      expect(response).to.be.false;
    })
  })
})