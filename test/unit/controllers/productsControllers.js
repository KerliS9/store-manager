const sinon = require('sinon');
const { expect } = require('chai');
const ProductsServices = require('../../../services/productsServices');
const ProductsControllers = require('../../../controllers/productsControllers');
const { products } = require('../../../const/mockForTest');

describe('Check controllers: where function is getAllProducts', () => {
  describe('when there are products in the database', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductsServices, 'getAllProducts').resolves(products);
    });
    after(() => {
      ProductsServices.getAllProducts.restore();
    });
    it('the method "status" is called with code 200', async () => {
      await ProductsControllers.getAllProducts(request, response);
      expect(response.status.calledWith(200)).to.be.true;
    });
    it('the method "json" should return an array', async () => {
      await ProductsControllers.getAllProducts(request, response);
      expect(response.json.calledWith(products)).to.be.true;
    });
  });
  describe('when there is no products in the database', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductsServices, 'getAllProducts').resolves([]);
    });
    after(() => {
      ProductsServices.getAllProducts.restore();
    });
    it('the method "status" is called with code 200', async () => {
      await ProductsControllers.getAllProducts(req, res);
      expect(response.status.calledWith(200)).to.be.true;
    });
    it('the method "json" should return an array', async () => {
      await ProductsControllers.getAllProducts(req, res);
      expect(response.json.calledWith(sinon.match.array)).to.be.true;
    });
  })
})