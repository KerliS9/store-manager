const sinon = require('sinon');
const { expect } = require('chai');
// const connection = require('../../../db/connection');
const ProductsModels = require('../../../models/productsModels');
const ProductsServices = require('../../../services/productsServices');
const { productPayload } = require('../../../const/mockForTest');

const { name } = productPayload;

describe('Check Service Post: insert product on database', () => {
  describe('when the insertion happens successfully', () => {
    before(() => {
      sinon.stub(ProductsModels, 'getProductByName').resolves(undefined);
      sinon.stub(ProductsModels, 'addNewProduct').resolves(productPayload);
    });
    after(() => {
      ProductsModels.getProductByName.restore();
      ProductsModels.addNewProduct.restore();
    });
    it('should return undefined', async() => {
      const response = await ProductsModels.getProductByName(name);
      // console.log('name on service', response);
      expect(response).to.be.a('undefined');
    })

    it('should be an object', async () => {
      const response = await ProductsServices.addNewProduct(productPayload);
      // console.log('teste service', response);
      expect(response).to.be.an('object');
    });
    it('the object should have the keys id, name, quantity', async () => {
      const { newProduct } = await ProductsServices.addNewProduct(productPayload);
      // console.log('teste service keys', newProduct);
      expect(newProduct).to.include.all.keys('id', 'name', 'quantity');
    });
    it('object should not to be empty', async () => {
      const { newProduct } = await ProductsServices.addNewProduct(productPayload);
      // console.log('teste service not empty', newProduct);
      expect(newProduct).to.not.be.empty;
    });
  });

  describe('when product already exists on database', () => {
    before(() => {
      sinon.stub(ProductsModels, 'getProductByName').resolves(name);
      sinon.stub(ProductsModels, 'addNewProduct').resolves(productPayload);
    });
    after(() => {
      ProductsModels.addNewProduct.restore();
    })
    it('should return string', async() => {
      const response = await ProductsModels.getProductByName(name);
      // console.log('name on service', response);
      expect(response).to.be.a('string');
    })
    it('should return an object with the keys statusCode and message', async () => {
      const response = await ProductsServices.addNewProduct(productPayload);
      // console.log('produto já existe', response);
      expect(response).to.include.all.keys('statusCode', 'message');
    })
  })
})