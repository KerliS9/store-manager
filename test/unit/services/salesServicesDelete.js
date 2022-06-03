const sinon = require('sinon');
const { expect } = require('chai');
const SalesModels = require('../../../models/salesModels');
const ProductsModels = require('../../../models/productsModels');
const SalesService = require('../../../services/salesServices');
const { salesById } = require('../../../const/mockForSales');
const { productPayload } = require('../../../const/mockForTest');

describe('Check Sales Services DELETE: delete sale from database', () => {
  describe('when there is a sale that match with the id in the database', () => {
    before(() => {
      sinon.stub(SalesModels, 'getSaleById').resolves(salesById);
      sinon.stub(ProductsModels, 'getProductById').resolves(productPayload);
      sinon.stub(ProductsModels, 'updateProductById').resolves(productPayload);
      sinon.stub(SalesService, 'deleteSaleById').resolves({ statusCode: 204 });
    });
    after(() => {
      SalesModels.getSaleById.restore();
      ProductsModels.getProductById.restore();
      ProductsModels.updateProductById.restore();
      SalesService.deleteSaleById.restore();
    });

    it('should be an array', async () => {
      const [response] = await SalesService.getSaleById(1);
      expect(response).to.be.an('array');
    });
    it('should be an object', async () => {
      const response = await ProductsModels.getProductById(1);
      expect(response).to.be.an('object');
    });
    it('the object should have the keys id, name, quantity', async () => {
      const response = await ProductsModels.updateProductById(productPayload);
      expect(response).to.include.all.keys('id', 'name', 'quantity');
    });
    it('the object should have the keys statusCode', async () => {
      const response = await SalesService.deleteSaleById(1);
      expect(response).to.include.all.keys('statusCode');
    });
  })

  describe('when there is no sale in the database', () => {
    before(() => {
      sinon.stub(SalesModels, 'getSaleById').resolves([]);
      sinon.stub(SalesService, 'deleteSaleById').resolves({ statusCode: 404, message: 'Sale not found' });
    });
    after(() => {
      SalesModels.getSaleById.restore();
      SalesService.deleteSaleById.restore();
    });
    it('should be an empty', async () => {
      const response = await SalesModels.getSaleById(1);
      expect(response).to.be.empty;
    });
    it('should return the keys statusCode and message', async () => {
      const response = await SalesService.deleteSaleById(1);
      expect(response).to.include.all.keys('statusCode', 'message');
    })
  })
})