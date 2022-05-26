const sinon = require('sinon');
const { expect } = require('chai');
const SalesModels = require('../../../models/salesModels');
const ProductsServices = require('../../../services/productsServices');
const { sales } = require('../../../const/mockForTest');

describe('Check Services Sales: get all sales from database', () => {
  describe('when there are sales in the database', () => {
    before(() => {
      sinon.stub(SalesModels, 'getAllSales').resolves(sales);
    });
    after(() => {
      SalesModels.getAllSales.restore();
    });

    it('should return an array', async () => {
      const [response] = await ProductsServices.getAllSales();
      expect(response).to.be.an('array');
    });
    it('array should not to be empty', async () => {
      const [response] = await ProductsServices.getAllSales();
      expect(response).to.not.be.empty;
    });
    it('should be an object', async () => {
      const [response] = await ProductsServices.getAllSales();
      expect(response[0]).to.be.an('object');
    });
    it('the object should have the keys id, date', async () => {
      const [response] = await ProductsServices.getAllSales();
      expect(response[0]).to.include.all.keys('id', 'date');
    })
  })

  describe('when there is no sale in the database', () => {
    before(() => {
      sinon.stub(SalesModels, 'getAllSales').resolves([[]]);
    });
    after(() => {
      SalesModels.getAllSales.restore();
    })
    it('should return an empty array', async () => {
      const response = await ProductsServices.getAllSales();
      expect(response).to.be.empty;
      expect(response).to.be.an('array');
    })
  })
})