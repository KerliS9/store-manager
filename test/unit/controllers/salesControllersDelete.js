const sinon = require('sinon');
const { expect } = require('chai');
const SalesServices = require('../../../services/salesServices');
const SalesControllers = require('../../../controllers/salesControllers');
// const { sales } = require('../../../const/mockForTest');

describe('Check Sales Controllers DELETE: when the method is delete a sale', () => {
  describe('when there is a sale in the database', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: 1 };
      response.status = sinon.stub().returns(response);
      response.send = sinon.stub().returns();

      sinon.stub(SalesServices, 'deleteSaleById').resolves({ statusCode: 204 })
    });
    after(() => {
      SalesServices.deleteSaleById.restore();
    });
    it('the method "status" is called with code 204', async () => {
      await SalesControllers.deleteSaleById(request, response);
      expect(response.status.calledWith(204)).to.be.true;
    });
    it('the method "send" should return an object', async () => {
      await SalesControllers.deleteSaleById(request, response);
      expect(response.send.calledWith()).to.be.true;
    });
  });
  describe('when there is no sales in the database', () => {
    const response = {};
    const request = {};
    const next = { next: (args) => {} };
    const nextSpy = sinon.spy(next, 'next');

    before(() => {
      request.params = { };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);

      sinon.stub(SalesServices, 'deleteSaleById').resolves({ statusCode: 404, message: 'Sale not found' });
    });
    after(() => {
      SalesServices.deleteSaleById.restore();
    });
    it('the method "status" is called with code 404 and method "json" should return an message', async () => {
      await SalesControllers.deleteSaleById(request, response, next.next);
      expect(nextSpy.calledWith({ statusCode: 404, message: 'Sale not found' })).to.be.true;
    });
  })
})