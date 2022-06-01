const sinon = require('sinon');
const { expect } = require('chai');
const ProductsServices = require('../../../services/productsServices');
const ProductsControllers = require('../../../controllers/productsControllers');
const { products } = require('../../../const/mockForTest');

describe('Check controllers Delete Product: when the method is delete a product', () => {
  describe('when there is a product in the database', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: 1 };
      response.status = sinon.stub().returns(response);
      response.send = sinon.stub().returns();

      sinon.stub(ProductsServices, 'deleteProductById').resolves({ statusCode: 204 })
    });
    after(() => {
      ProductsServices.deleteProductById.restore();
    });
    it('the method "status" is called with code 204', async () => {
      await ProductsControllers.deleteProductById(request, response);
      expect(response.status.calledWith(204)).to.be.true;
    });
    it('the method "send" should return an object', async () => {
      await ProductsControllers.deleteProductById(request, response);
      expect(response.send.calledWith()).to.be.true;
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

      sinon.stub(ProductsServices, 'deleteProductById').resolves({ statusCode: 404, message: 'Product not found' });
    });
    after(() => {
      ProductsServices.deleteProductById.restore();
    });
    it('the method "status" is called with code 404 and method "json" should return an message', async () => {
      await ProductsControllers.deleteProductById(request, response, next.next);
      expect(nextSpy.calledWith({ statusCode: 404, message: 'Product not found' })).to.be.true;
    });
  })
})