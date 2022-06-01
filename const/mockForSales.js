const DATE = '2022-05-26T22:45:18.000Z';

const sales = [
  [
    {
      saleId: 1,
      date: DATE,
      productId: 1,
      quantity: 5,
    },
    {
      saleId: 1,
      date: DATE,
      productId: 2,
      quantity: 10,
    },
    {
      saleId: 2,
      date: DATE,
      productId: 3,
      quantity: 15,
    },
  ],
];

const salesById = [
  [
    {
      date: DATE,
      productId: 1,
      quantity: 5,
    },
    {
      date: DATE,
      productId: 2,
      quantity: 10,
    },
  ],
];

const salePayload = {
  id: 1,
  productId: 1,
  quantity: 3,
};

const salePayloadPost = [
  {
    id: 1,
    productId: 2,
    quantity: 3,
  },
  {
    id: 1,
    productId: 1,
    quantity: 3,
  },
];

const saleResult = {
  id: 1,
  itemsSold: [
    {
      productId: 1,
      quantity: 3,
    },
  ],
};

module.exports = {
  sales,
  salesById,
  salePayload,
  saleResult,
  salePayloadPost,
  salePayloadReqBody,
};