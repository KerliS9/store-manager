const sinon = require('sinon');
const { expect } = require('chai');
const ProductsServices = require('../../../services/productsServices');
const ProductsControllers = require('../../../controllers/productsControllers');
const { productPayload } = require('../../../const/mockForTest');

describe('Check Product Controllers PUT: where function is updateProductById', () => {
  describe('when there is a product in the database', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: 1 };
      request.body = productPayload;
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);

      sinon.stub(ProductsServices, 'updateProductById').resolves({ statusCode: 200, productUpdated: productPayload });
    });
    after(() => {
      ProductsServices.updateProductById.restore();
    });
    it('the method "status" is called with code 200', async () => {
      await ProductsControllers.updateProductById(request, response);
      expect(response.status.calledWith(200)).to.be.true;
    });
    it('the method "json" should return an object', async () => {
      await ProductsControllers.updateProductById(request, response);
      expect(response.json.calledWith(productPayload)).to.be.true;
    });
  });
  describe('when there is no products in the database', () => {
    const response = {};
    const request = {};
    const next = { next: (args) => {} };
    const nextSpy = sinon.spy(next, 'next');

    before(() => {
      request.params = { };
      request.body = productPayload;
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);

      sinon.stub(ProductsServices, 'updateProductById').resolves({ statusCode: 404, message: 'Product not found' });
    });
    after(() => {
      ProductsServices.updateProductById.restore();
    });
    it('the method "status" is called with code 404 and method "json" should return an message', async () => {
      await ProductsControllers.updateProductById(request, response, next.next);
      expect(nextSpy.calledWith({ statusCode: 404, message: 'Product not found' })).to.be.true;
    });
  })
})