const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../db/connection');
const SalesModels = require('../../../models/salesModels');
const SalesService = require('../../../services/salesServices');
const { salesById } = require('../../../const/mockForSales');

describe('Check Services Sales Delete: delete sale from database', () => {
  describe('when there is a sale that match with the id in the database', () => {
    before(() => {
      sinon.stub(SalesModels, 'getSaleById').resolves(salesById);
      sinon.stub(SalesModels, 'deleteSaleById').resolves({ statusCode: 204 });
    });
    after(() => {
      SalesModels.getSaleById.restore();
      SalesModels.deleteSaleById.restore();
    });

    it('should be an array', async () => {
      const [response] = await SalesService.getSaleById(1);
      // console.log('teste service', response);
      expect(response).to.be.an('array');
    });
    it('the object should have the keys statusCode', async () => {
      const response = await SalesService.deleteSaleById(1);
      // console.log('teste service', response);
      expect(response).to.include.all.keys('statusCode');
    });
  })

  describe('when there is no sale in the database', () => {
    before(() => {
      sinon.stub(SalesModels, 'getSaleById').resolves({});
      sinon.stub(SalesModels, 'deleteSaleById').resolves({ statusCode: 404, message: 'Sale not found' });
    });
    after(() => {
      SalesModels.getSaleById.restore();
      SalesModels.deleteSaleById.restore();
    });
    it('should be an empty', async () => {
      const response = await SalesModels.getSaleById(1);
      console.log('teste service', response);
      expect(response).to.be.empty;
    });
    it('should return the keys statusCode and message', async () => {
      const response = await SalesService.deleteSaleById(1);
      console.log('teste product ', response);
      expect(response).to.include.all.keys('statusCode', 'message');
    })
  })
})