const sinon = require('sinon');
const { expect } = require('chai');
const SalesServices = require('../../../services/salesServices');
const SalesControllers = require('../../../controllers/salesControllers');
const { sales } = require('../../../const/mockForSales');

describe('Check Sales Controllers GET: where function is getSaleById', () => {
  describe('when there is a sale in the database', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: 1 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(SalesServices, 'getSaleById').resolves({ statusCode:200, sale: sales[0][0] });
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
      expect(response.json.calledWith(sales[0][0])).to.be.true;
    });
  });
  describe('when there is no sales in the database', () => {
    const response = {};
    const request = {};
    const next = { next: (args) => {} };
    const nextSpy = sinon.spy(next, 'next');

    before(() => {
      request.params = { id: 1 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(SalesServices, 'getSaleById').resolves({ statusCode: 404, message: 'Sale not found' });
    });
    after(() => {
      SalesServices.getSaleById.restore();
    });
    it('the method "status" is called with code 404 and method "json" should return an message', async () => {
      await SalesControllers.getSaleById(request, response, next.next);
      expect(nextSpy.calledWith({ statusCode: 404, message: 'Sale not found' })).to.be.true;
    });
  })
})