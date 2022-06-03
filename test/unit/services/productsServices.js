const sinon = require('sinon');
const { expect } = require('chai');
const ProductsModels = require('../../../models/productsModels');
const ProductsServices = require('../../../services/productsServices');
const { products } = require('../../../const/mockForTest');

describe('Check Products Services GET: get all products from database', () => {
  describe('when there are products in the database', () => {
    before(() => {
      sinon.stub(ProductsModels, 'getAllProducts').resolves(products);
    });
    after(() => {
      ProductsModels.getAllProducts.restore();
    });

    it('should return an array', async () => {
      const response = await ProductsServices.getAllProducts();
      expect(response).to.be.an('array');
    });
    it('array should not to be empty', async () => {
      const response = await ProductsServices.getAllProducts();
      expect(response).to.not.be.empty;
    });
    it('should be an object', async () => {
      const [response] = await ProductsServices.getAllProducts();
      expect(response).to.be.an('object');
    });
    it('the object should have the keys id, name, quantity', async () => {
      const [response] = await ProductsServices.getAllProducts();
      expect(response).to.include.all.keys('id', 'name', 'quantity');
    })
  })

  describe('when there is no product in the database', () => {
    before(() => {
      sinon.stub(ProductsModels, 'getAllProducts').resolves([[]]);
    });
    after(() => {
      ProductsModels.getAllProducts.restore();
    })
    it('should return an empty array', async () => {
      const response = await ProductsServices.getAllProducts();
      expect(response).to.be.empty;
      expect(response).to.be.an('array');
    })
  })
})