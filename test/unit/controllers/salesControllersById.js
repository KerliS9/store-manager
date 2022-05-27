const sinon = require('sinon');
const { expect } = require('chai');
const SalesServices = require('../../../services/salesServices');
const SalesControllers = require('../../../controllers/salesControllers');
const { sales } = require('../../../const/mockForTest');

describe('Check controllers: where function is getSaleById', () => {
  describe('when there is a sale in the database', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: 1 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(SalesServices, 'getSaleById').resolves(sales);
    });
    after(() => {
      SalesServices.getSaleById.restore();
    });
    it('the method "status" is called with code 200', async () => {
      await SalesControllers.getSaleById(request, response);
      expect(response.status.calledWith(200)).to.be.true;
    });
    it('the method "json" should return an object', async () => {
      await SalesControllers.getSaleById(request, response);
      expect(response.json.calledWith(sales)).to.be.true;
    });
  });
  describe('when there is no sales in the database', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: 1 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(SalesServices, 'getSaleById').resolves([]);
    });
    after(() => {
      SalesServices.getSaleById.restore();
    });
    it('the method "status" is called with code 404', async () => {
      await SalesControllers.getSaleById(request, response);
      expect(response.status.calledWith(404)).to.be.true;
    });
    it('the method "json" should return an message', async () => {
      await SalesControllers.getSaleById(request, response);
      expect(response.json.calledWith({ message: 'Sale not found' })).to.be.true;
    });
  })
})