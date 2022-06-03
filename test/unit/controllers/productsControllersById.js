const sinon = require('sinon');
const { expect } = require('chai');
const ProductsServices = require('../../../services/productsServices');
const ProductsControllers = require('../../../controllers/productsControllers');
const { products } = require('../../../const/mockForTest');

describe('Check Products Controllers GET: where function is getProductById', () => {
  describe('when there is a product in the database', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: 1 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);

      sinon.stub(ProductsServices, 'getProductById').resolves({ statusCode: 200, product: products[0][0] });
    });
    after(() => {
      ProductsServices.getProductById.restore();
    });
    it('the method "status" is called with code 200', async () => {
      await ProductsControllers.getProductById(request, response);
      expect(response.status.calledWith(200)).to.be.true;
    });
    it('the method "json" should return an object', async () => {
      await ProductsControllers.getProductById(request, response);
      expect(response.json.calledWith(products[0][0])).to.be.true;
    });
  });
  describe('when there is no products in the database', () => {
    const response = {};
    const request = {};
    const next = { next: (args) => {} };
    const nextSpy = sinon.spy(next, 'next');

    before(() => {
      request.params = { };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);

      sinon.stub(ProductsServices, 'getProductById').resolves({ statusCode: 404, message: 'Product not found' });
    });
    after(() => {
      ProductsServices.getProductById.restore();
    });
    it('the method "status" is called with code 404 and method "json" should return an message', async () => {
      await ProductsControllers.getProductById(request, response, next.next);
      expect(nextSpy.calledWith({ statusCode: 404, message: 'Product not found' })).to.be.true;
    });
  })
})