const sinon = require('sinon');
const { expect } = require('chai');
const SalesServices = require('../../../services/salesServices');
const SalesControllers = require('../../../controllers/salesControllers');
const { salePayloadReqBody, saleResult } = require('../../../const/mockForSales');

describe('Check controllers: where function is addNewProduct', () => {
  describe('when there is a product to add to the database', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = salePayloadReqBody;
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);

      sinon.stub(SalesServices, 'addNewSale').resolves({ statusCode: 201, data: saleResult });
    });
    after(() => {
      SalesServices.addNewSale.restore();
    });
    it('the method "status" is called with code 201', async () => {
      await SalesControllers.addNewSale(request, response);
      expect(response.status.calledWith(201)).to.be.true;
    });
    it('the method "json" should return an object', async () => {
      await SalesControllers.addNewSale(request, response);
      expect(response.json.calledWith(saleResult)).to.be.true;
    });
  });
  /* describe('when there is no products in the database', () => {
    const response = {}; // usar para validar as informações incorretas
    const request = {};
    const next = { next: (args) => {} };
    const nextSpy = sinon.spy(next, 'next');

    before(() => {
      request.body = { };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);
      
      sinon.stub(SalesServices, 'addNewSale').resolves({ statusCode: 422, message: error });
    });
    after(() => {
      SalesServices.addNewSale.restore();
    });
    it('the method "status" is called with code 409 e method "json" have a message', async () => {
      await SalesControllers.addNewSale(request, response, next.next);
      expect(nextSpy.calledWith({ statusCode: 422, message: error })).to.be.true;
    });
  }) */
})