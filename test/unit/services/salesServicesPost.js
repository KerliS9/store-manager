const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../db/connection');
const SalesModels = require('../../../models/salesModels');
const ProductsModels = require('../../../models/productsModels');
const SalesServices = require('../../../services/salesServices');
const { salePayloadPost, saleResult } = require('../../../const/mockForSales');
const { productPayload } = require('../../../const/mockForTest');

describe('Check Sale Service Post: insert sale on database', () => {
  describe('when the insertion happens successfully', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
      sinon.stub(SalesModels, 'addProductSold').resolves(saleResult);
      sinon.stub(ProductsModels, 'getProductById').resolves(productPayload);
    });
    after(() => {
      connection.execute.restore();
      SalesModels.addProductSold.restore();
      ProductsModels.getProductById.restore();
    });
    it('should return an id', async() => {
      const { id } = await SalesModels.addNewSale();
      expect(id).to.be.a('number');
    })
    it('should be an object', async () => {
      const response = await ProductsModels.getProductById(salePayloadPost.id);
      expect(response).to.be.an('object');
    });
    it('should be an array', async () => {
      const { data: { itemsSold }} = await SalesServices.addNewSale(salePayloadPost);
      expect(itemsSold).to.be.an('array');
    });
    it('the object should have the keys id, itemsSold', async () => {
      const { data } = await SalesServices.addNewSale(salePayloadPost);
      expect(data).to.include.all.keys('id', 'itemsSold');
    });
    it('object should not to be empty', async () => {
      const { data: { itemsSold } } = await SalesServices.addNewSale(salePayloadPost);
      expect(itemsSold[0]).to.not.be.empty;
    });
  });
})