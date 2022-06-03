const sinon = require('sinon');
const { expect } = require('chai');
const SalesModels = require('../../../models/salesModels');
const ProductsModels = require('../../../models/productsModels');
const SalesService = require('../../../services/salesServices');
const { salesById } = require('../../../const/mockForSales');
const { productPayload } = require('../../../const/mockForTest');

describe('Check Services Sales Delete: delete sale from database', () => {
  describe('when there is a sale that match with the id in the database', () => {
    before(() => {
      sinon.stub(SalesModels, 'getSaleById').resolves(salesById);
      sinon.stub(SalesModels, 'deleteSaleById').resolves({ statusCode: 204 });
      sinon.stub(ProductsModels, 'getProductById').resolves(productPayload);
    });
    after(() => {
      SalesModels.getSaleById.restore();
      SalesModels.deleteSaleById.restore();
      ProductsModels.getProductById.restore();
    });

    it('should be an array', async () => {
      const [response] = await SalesService.getSaleById(1);
      expect(response).to.be.an('array');
    });
    it('the object should have the keys statusCode', async () => {
      const response = await SalesService.deleteSaleById(1);
      expect(response).to.include.all.keys('statusCode');
    });
    it('should be an object', async () => {
      const response = await ProductsModels.getProductById(productPayload);
      expect(response).to.be.an('object');
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