const sinon = require('sinon');
const { expect } = require('chai');
const ProductsServices = require('../../../services/productsServices');
const ProductsControllers = require('../../../controllers/productsControllers');
const { products } = require('../../../const/mockForTest');

describe('Check controllers: where function is getProductById', () => {
  describe('when there is a product in the database', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: 1 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductsServices, 'getProductById').resolves(products);
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
      expect(response.json.calledWith(products)).to.be.true;
    });
  });
  /* describe('when there is no products in the database', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: 1 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductsServices, 'getProductById').resolves([]);
    });
    after(() => {
      ProductsServices.getProductById.restore();
    });
    it('the method "status" is called with code 404', async () => {
      const test = await ProductsControllers.getProductById(request, response);
      // console.log('controller tests', test);
      expect(response.status.calledWith(404)).to.be.true;
      expect(nex)
    });
    it('the method "json" should return an message', async () => {
      await ProductsControllers.getProductById(request, response);
      expect(response.json.calledWith({ message: 'Product not found' })).to.be.true;
    });
  }) */
})