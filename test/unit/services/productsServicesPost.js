const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../db/connection');
const ProductsModels = require('../../../models/productsModels');
const ProductsServices = require('../../../services/productsServices');
const { productPayload } = require('../../../const/mockForTest');

const { name } = productPayload;

describe('Check Service Post: insert product on database', () => {
  describe('when the insertion happens successfully', () => {
    before(() => {
      sinon.stub(ProductsModels, 'addNewProduct').resolves(name);
    });
    after(() => {
      ProductsModels.addNewProduct.restore();
    });
    it('should return an id', async() => {
      const response = await ProductsServices.getProductByName(name);
      console.log('name', response);
      expect(response).to.be.a('string');
    })

    it('should be an object', async () => {
      const response = await ProductsServices.addNewProduct(productPayload);
      console.log('teste model', response);
      expect(response).to.be.an('object');
    });
    it('the object should have the keys id, name, quantity', async () => {
      const response = await ProductsServices.addNewProduct(productPayload);
      expect(response).to.include.all.keys('id', 'name', 'quantity');
    });
    it('object should not to be empty', async () => {
      const response = await ProductsServices.addNewProduct(productPayload);
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