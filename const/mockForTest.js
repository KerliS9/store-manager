const DATE = '2022-05-26T22:45:18.000Z';

const products = [
  [
    {
      id: 1,
      name: 'Martelo de Thor',
      quantity: 10,
    },
    {
      id: 2,
      name: 'Traje de encolhimento',
      quantity: 20,
    },
    {
      id: 3,
      name: 'Escudo do Capitão América',
      quantity: 30,
    },
  ],
];

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

const productPayload = {
  id: 1,
  name: 'Martelo de Thor',
  quantity: 10,
};

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
  products,
  sales,
  salesById,
  productPayload,
  salePayload,
  saleResult,
  salePayloadPost,
};