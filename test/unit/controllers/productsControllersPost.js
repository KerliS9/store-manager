const sinon = require('sinon');
const { expect } = require('chai');
const ProductsServices = require('../../../services/productsServices');
const ProductsControllers = require('../../../controllers/productsControllers');
const { productPayload } = require('../../../const/mockForTest');

describe('Check controllers: where function is addNewProduct', () => {
  describe('when there is a product to add to the database', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = productPayload;
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);

      sinon.stub(ProductsServices, 'addNewProduct').resolves({ statusCode: 201, newProduct: productPayload });
    });
    after(() => {
      ProductsServices.addNewProduct.restore();
    });
    it('the method "status" is called with code 201', async () => {
      await ProductsControllers.addNewProduct(request, response);
      expect(response.status.calledWith(201)).to.be.true;
    });
    it('the method "json" should return an object', async () => {
      await ProductsControllers.addNewProduct(request, response);
      expect(response.json.calledWith(productPayload)).to.be.true;
    });
  });
  describe('when there is no products in the database', () => {
    const response = {};
    const request = {};
    const next = { next: (args) => {} };
    const nextSpy = sinon.spy(next, 'next');

    before(() => {
      request.body = { };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);
      
      sinon.stub(ProductsServices, 'addNewProduct').resolves({ statusCode: 409, message: 'Product already exists' });
    });
    after(() => {
      ProductsServices.addNewProduct.restore();
    });
    it('the method "status" is called with code 409 e method "json" have a message', async () => {
      await ProductsControllers.addNewProduct(request, response, next.next);
      expect(nextSpy.calledWith({ statusCode: 409, message: 'Product already exists' })).to.be.true;
    });
  })
})