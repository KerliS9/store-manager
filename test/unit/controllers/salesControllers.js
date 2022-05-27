const sinon = require('sinon');
const { expect } = require('chai');
const SalesServices = require('../../../services/salesServices');
const SalesControllers = require('../../../controllers/salesControllers');
const { products } = require('../../../const/mockForTest');

describe('Check controllers Sales: where function is getAllSales', () => {
  describe('when there are sales in the database', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(SalesServices, 'getAllSales').resolves(products);
    });
    after(() => {
      SalesServices.getAllSales.restore();
    });
    it('the method "status" is called with code 200', async () => {
      await SalesControllers.getAllSales(request, response);
      expect(response.status.calledWith(200)).to.be.true;
    });
    it('the method "json" should return an array', async () => {
      await SalesControllers.getAllSales(request, response);
      expect(response.json.calledWith(products)).to.be.true;
    });
  });
  describe('when there is no sale in the database', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(SalesServices, 'getAllSales').resolves([]);
    });
    after(() => {
      SalesServices.getAllSales.restore();
    });
    it('the method "status" is called with code 200', async () => {
      await SalesControllers.getAllSales(request, response);
      expect(response.status.calledWith(200)).to.be.true;
    });
    it('the method "json" should return an array', async () => {
      await SalesControllers.getAllSales(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.true;
    });
  })
})