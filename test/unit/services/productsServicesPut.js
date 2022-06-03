const sinon = require('sinon');
const { expect } = require('chai');
const ProductsModels = require('../../../models/productsModels');
const ProductsServices = require('../../../services/productsServices');
const { products, productPayload } = require('../../../const/mockForTest');

describe('Check Products Services PUT: update product by id from database', () => {
  describe('when there is a product that match with the id in the database', () => {
    before(() => {
      sinon.stub(ProductsModels, 'getProductById').resolves(productPayload);
      sinon.stub(ProductsModels, 'updateProductById').resolves(productPayload);
    });
    after(() => {
      ProductsModels.getProductById.restore();
      ProductsModels.updateProductById.restore();
    });

    it('should be an object', async () => {
      const { productUpdated } = await ProductsServices.updateProductById(productPayload);
      console.log('test', productUpdated);
      expect(productUpdated).to.be.an('object');
    });
    it('the object should have the keys id, name, quantity', async () => {
      const { productUpdated } = await ProductsServices.updateProductById(productPayload);
      expect(productUpdated).to.include.all.keys('id', 'name', 'quantity');
    });
    it('object should not to be empty', async () => {
      const { productUpdated } = await ProductsServices.updateProductById(productPayload);
      expect(productUpdated).to.not.be.empty;
    });
  })

  describe('when there is no product in the database', () => {
    before(() => {
      sinon.stub(ProductsServices, 'updateProductById').resolves({ statusCode: 404, message: 'Product not found' })
    });
    after(() => {
      ProductsServices.updateProductById.restore();
    })
    it('should return an object with the keys statusCode and message ', async () => {
      const response = await ProductsServices.updateProductById(productPayload);
      console.log('service test', response);
      expect(response).to.include.all.keys('statusCode', 'message');;
    })
  })
})