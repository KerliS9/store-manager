const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../db/connection');
const ProductsModels = require('../../../models/productsModels');
const ProductsServices = require('../../../services/productsServices');
const { productPayload } = require('../../../const/mockForTest');

describe('Check Services Sales Delete: delete sale from database', () => {
  describe('when there is a sale that match with the id in the database', () => {
    before(() => {
      sinon.stub(ProductsModels, 'getProductById').resolves(productPayload);
      sinon.stub(ProductsModels, 'deleteProductById').resolves({ statusCode: 204 });
    });
    after(() => {
      ProductsModels.getProductById.restore();
      ProductsModels.deleteProductById.restore();
    });

    it('should be an object', async () => {
      const response = await ProductsServices.getProductById(1);
      expect(response).to.be.an('object');
    });
    it('the object should have the keys statusCode', async () => {
      const response = await ProductsServices.deleteProductById(1);
      expect(response).to.include.all.keys('statusCode');
    });
  })

  describe('when there is no product in the database', () => {
    before(() => {
      sinon.stub(ProductsModels, 'getProductById').resolves([]);
      sinon.stub(ProductsServices, 'deleteProductById').resolves({ statusCode: 404, message: 'Product not found' });
    });
    after(() => {
      ProductsModels.getProductById.restore();
      ProductsServices.deleteProductById.restore();
    });
    it('should be an empty', async () => {
      const response = await ProductsModels.getProductById(1);
      expect(response).to.be.empty;
    });
    it('should return the keys statusCode and message', async () => {
      const response = await ProductsServices.deleteProductById(1);
      expect(response).to.include.all.keys('statusCode', 'message');
    })
  })
})