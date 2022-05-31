const sinon = require('sinon');
const { expect } = require('chai');
const ProductsServices = require('../../../services/productsServices');
const ProductsControllers = require('../../../controllers/productsControllers');
const { productPayload } = require('../../../const/mockForTest');

describe.only('Check controllers: where function is addNewProduct', () => {
  describe('when there is a product to add to the database', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = productPayload;
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductsServices, 'addNewProduct').resolves(productPayload);
    });
    after(() => {
      ProductsServices.addNewProduct.restore();
    });
    it('the method "status" is called with code 201', async () => {
      const resp = await ProductsControllers.addNewProduct(request, response);
      console.log('controller status', resp);
      expect(response.status.calledWith(201)).to.be.true;
    });
    it('the method "json" should return an object', async () => {
      const resp = await ProductsControllers.addNewProduct(request, response);
      console.log('controller json', resp);
      expect(response.json.calledWith(productPayload)).to.be.true;
    });
  });
  /* describe('when there is no products in the database', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductsServices, 'addNewProduct').resolves([]);
    });
    after(() => {
      ProductsServices.addNewProduct.restore();
    });
    it('the method "status" is called with code 404', async () => {
      const test = await ProductsControllers.addNewProduct(request, response, next.next);
      // console.log('controller tests', test);
      expect(response.status.calledWith(404)).to.be.true;
      expect(nextSpy.calledWith({ statusCode: 409, message: 'Product already exists' }))
    });
    it('the method "json" should return an message', async () => {
      await ProductsControllers.addNewProduct(request, response);
      expect(response.json.calledWith({ message: 'Product not found' })).to.be.true;
    });
  }) */
})