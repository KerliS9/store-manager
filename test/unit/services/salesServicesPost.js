const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../db/connection');
const SalesModels = require('../../../models/salesModels');
const SalesServices = require('../../../services/salesServices');
const { salePayloadPost, saleResult } = require('../../../const/mockForSales');

describe('Check Sale Service Post: insert sale on database', () => {
  describe('when the insertion happens successfully', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
      sinon.stub(SalesModels, 'addProductSold').resolves(saleResult);
    });
    after(() => {
      connection.execute.restore();
      SalesModels.addProductSold.restore();
    });
    it('should return an id', async() => {
      const { id } = await SalesModels.addNewSale();
      // console.log('name on service', id);
      expect(id).to.be.a('number');
    })

    it('should be an object', async () => {
      const {data: { itemsSold }} = await SalesServices.addNewSale(salePayloadPost);
      /* await Promise.all(sale.map(({ productId, quantity }) => (
        insertProductsSold.push(SalesModels.addProductSold({ id, productId, quantity }))
        ))); */
      // console.log('teste service', itemsSold[0]);
      expect(itemsSold[0]).to.be.an('object');
    });
    it('the object should have the keys id, itemsSold', async () => {
      const { data } = await SalesServices.addNewSale(salePayloadPost);
      // console.log('teste service keys', data);
      expect(data).to.include.all.keys('id', 'itemsSold');
    });
    it('object should not to be empty', async () => {
      const { data: { itemsSold } } = await SalesServices.addNewSale(salePayloadPost);
      // console.log('teste service not empty', itemsSold[0]);
      expect(itemsSold[0]).to.not.be.empty;
    });
  });
})