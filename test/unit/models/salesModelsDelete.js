const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../db/connection');
const SalesModels = require('../../../models/salesModels');

describe('Check Sales Models DELETE: delete sale from database', () => {
  describe('when deleting happens successfully', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves({});
    });
    after(() => {
      connection.execute.restore();
    });
    it('should be an object', async () => {
      const response = await SalesModels.deleteSaleById(1);
      expect(response).to.be.an('object');
    });
    it('object should be empty', async () => {
      const response = await SalesModels.deleteSaleById(1);
      expect(response).to.be.empty;
    });
  });
})