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
      sinon.stub(ProductsModels, 'addNewProduct').resolves(productPayload);
    });
    after(() => {
      ProductsModels.addNewProduct.restore();
    });
    it('should return an object', async() => {
      const response = await ProductsModels.getProductByName(name);
      console.log('name on service', response);
      expect(response).to.be.a('object');
    })

    it('should be an object', async () => {
      const response = await ProductsServices.addNewProduct(productPayload);
      console.log('teste service', response);
      expect(response).to.be.an('object');
    });
    it('the object should have the keys id, name, quantity', async () => {
      const response = await ProductsServices.addNewProduct(productPayload);
      console.log('teste service keys', response);
      expect(response).to.include.all.keys('id', 'name', 'quantity');
    });
    it('object should not to be empty', async () => {
      const response = await ProductsServices.addNewProduct(productPayload);
      console.log('teste service not empty', response);
      expect(response).to.not.be.empty;
    });
  });

  /* describe('when product already exists on database', () => {
    before(() => {
      sinon.stub(ProductsModels, 'addNewProduct').resolves([[]]);
    });
    after(() => {
      ProductsModels.addNewProduct.restore();
    })
    it('should return false', async () => {
      const response = await ProductsServices.addNewProduct();
      expect(response).to.be.false;
    })
  }) */
})