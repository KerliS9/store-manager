const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../db/connection');
const ProductsModels = require('../../../models/productsModels');
const ProductsServices = require('../../../services/productsServices');
const { products } = require('../../../const/mockForTest');

describe('Check Products Services GET: get product by id from database', () => {
  describe('when there is a product that match with the id in the database', () => {
    before(() => {
      sinon.stub(ProductsModels, 'getProductById').resolves(products);
    });
    after(() => {
      ProductsModels.getProductById.restore();
    });

    it('should be an object', async () => {
      const { product } = await ProductsServices.getProductById(1);
      expect(product[0][0]).to.be.an('object');
    });
    it('the object should have the keys id, name, quantity', async () => {
      const { product } = await ProductsServices.getProductById(1);
      expect(product[0][0]).to.include.all.keys('id', 'name', 'quantity');
    });
    it('object should not to be empty', async () => {
      const { product } = await ProductsServices.getProductById(1);
      expect(product[0][0]).to.not.be.empty;
    });
  })

  describe('when there is no product in the database', () => {
    before(() => {
      sinon.stub(ProductsServices, 'getProductById').resolves({ statusCode: 404, message: 'Product not found' })
    });
    after(() => {
      ProductsServices.getProductById.restore();
    })
    it('should return an object with the keys statusCode and message ', async () => {
      const response = await ProductsServices.getProductById(1);
      expect(response).to.include.all.keys('statusCode', 'message');;
    })
  })
})