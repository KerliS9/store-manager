const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../db/connection');
const ProductsModels = require('../../../models/productsModels');
const ProductsServices = require('../../../services/productsServices');
const { productPayload } = require('../../../const/mockForTest');

describe.only('Check Services Sales Delete: delete sale from database', () => {
  describe('when there is a sale that match with the id in the database', () => {
    before(() => {
      sinon.stub(ProductsModels, 'getProductById').resolves(productPayload);
      sinon.stub(ProductsModels, 'deleteProductById').resolves({ statusCode: 204 });
    });
    after(() => {
      ProductsModels.getProductById.restore();
      ProductsModels.deleteProductById.restore();
    });

    it('should be an array', async () => {
      const [response] = await ProductsServices.getProductById(1);
      // console.log('teste service', response);
      expect(response).to.be.an('array');
    });
    it('the object should have the keys statusCode', async () => {
      const response = await ProductsServices.deleteProductById(1);
      // console.log('teste service', response);
      expect(response).to.include.all.keys('statusCode');
    });
  })

  describe('when there is no sale in the database', () => {
    before(() => {
      sinon.stub(ProductsModels, 'getProductById').resolves({});
      sinon.stub(ProductsModels, 'deleteProductById').resolves({ statusCode: 404, message: 'Product not found' });
    });
    after(() => {
      ProductsModels.getProductById.restore();
      ProductsModels.deleteProductById.restore();
    });
    it('should be an empty', async () => {
      const response = await ProductsServices.getProductById(1);
      console.log('teste service', response);
      expect(response).to.be.empty;
    });
    it('should return the keys statusCode and message', async () => {
      const response = await ProductsServices.deleteSaleById(1);
      console.log('teste product ', response);
      expect(response).to.include.all.keys('statusCode', 'message');
    })
  })
})