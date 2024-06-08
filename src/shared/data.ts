export const RESIDENTIAL_SERVICES = [
  {
    id: 1,
    title: "EICR - Electrical Certificate",
    name: "eicr",
    priceData: [
      { bedrooms: 0, price: 79 }, // 0 is for studio_flat
      { bedrooms: 1, price: 99 },
      { bedrooms: 2, price: 99 },
      { bedrooms: 3, price: 119 },
      { bedrooms: 4, price: 119 },
      { bedrooms: 5, price: 149 },
    ],
    quantity: 1,
    unit: "fuse box",
    extraUnitCost: 80,
  },
  {
    id: 2,
    title: "Gas Safety Certificate",
    name: "gas_cert",
    priceData: [
      { bedrooms: 0, price: 79 }, // 0 is for studio_flat
      { bedrooms: 1, price: 99 },
      { bedrooms: 2, price: 99 },
      { bedrooms: 3, price: 119 },
      { bedrooms: 4, price: 119 },
      { bedrooms: 5, price: 149 },
    ],
    quantity: 1,
    unit: "appliance",
    extraUnitCost: 10,
  },
  {
    id: 3,
    title: "Energy Performance Certificate",
    name: "epc",
    priceData: [
      { bedrooms: 0, price: 79 }, // 0 is for studio_flat
      { bedrooms: 1, price: 99 },
      { bedrooms: 2, price: 99 },
      { bedrooms: 3, price: 119 },
      { bedrooms: 4, price: 119 },
      { bedrooms: 5, price: 149 },
    ],
    quantity: 1,
    unit: "something",
  },
  {
    id: 4,
    title: "PAT Testing",
    name: "pat",
    priceData: [
      { bedrooms: 0, price: 79 }, // 0 is for studio_flat
      { bedrooms: 1, price: 99 },
      { bedrooms: 2, price: 99 },
      { bedrooms: 3, price: 119 },
      { bedrooms: 4, price: 119 },
      { bedrooms: 5, price: 149 },
    ],
    quantity: 1,
    unit: "something",
  },
  {
    id: 5,
    title: "Gas Safety Certificate + Boiler Service",
    name: "gas_boiler",
    priceData: [
      { bedrooms: 0, price: 79 }, // 0 is for studio_flat
      { bedrooms: 1, price: 99 },
      { bedrooms: 2, price: 99 },
      { bedrooms: 3, price: 119 },
      { bedrooms: 4, price: 119 },
      { bedrooms: 5, price: 149 },
    ],
    quantity: 1,
    unit: "something",
  },
  {
    id: 6,
    title: "Fire Safety Certificate",
    name: "fire_safety",
    priceData: [
      { bedrooms: 0, price: 79 }, // 0 is for studio_flat
      { bedrooms: 1, price: 99 },
      { bedrooms: 2, price: 99 },
      { bedrooms: 3, price: 119 },
      { bedrooms: 4, price: 119 },
      { bedrooms: 5, price: 149 },
    ],
    quantity: 1,
    unit: "something",
  },
  {
    id: 7,
    title: "Fire Risk Assessment",
    name: "fire_risk",
    priceData: [
      { bedrooms: 0, price: 79 }, // 0 is for studio_flat
      { bedrooms: 1, price: 99 },
      { bedrooms: 2, price: 99 },
      { bedrooms: 3, price: 119 },
      { bedrooms: 4, price: 119 },
      { bedrooms: 5, price: 149 },
    ],
    quantity: 1,
    unit: "something",
  },
  {
    id: 8,
    title: "Emergency Lighting Certificate",
    name: "emergency_light",
    priceData: [
      { bedrooms: 0, price: 79 }, // 0 is for studio_flat
      { bedrooms: 1, price: 99 },
      { bedrooms: 2, price: 99 },
      { bedrooms: 3, price: 119 },
      { bedrooms: 4, price: 119 },
      { bedrooms: 5, price: 149 },
    ],
    quantity: 1,
    unit: "something",
  },
];

export const COMMERCIAL_SERVICES = [
  {
    id: 1,
    title: "EICR - Electrical Certificate",
    name: "com_eicr",
    priceData: [
      {
        bedrooms: 0, // 0 is for studio_flat
        price: 79,
      },
      {
        bedrooms: 1,
        price: 99,
      },
      {
        bedrooms: 2,
        price: 99,
      },
      {
        bedrooms: 3,
        price: 119,
      },
      {
        bedrooms: 4,
        price: 119,
      },
      {
        bedrooms: 5,
        price: 149,
      },
    ],
    quantity: 1,
    unit: "something",
  },
  {
    id: 2,
    title: "PAT Testing",
    name: "com_pat",
    priceData: [
      {
        bedrooms: 0, // 0 is for studio_flat
        price: 79,
      },
      {
        bedrooms: 1,
        price: 99,
      },
      {
        bedrooms: 2,
        price: 99,
      },
      {
        bedrooms: 3,
        price: 119,
      },
      {
        bedrooms: 4,
        price: 119,
      },
      {
        bedrooms: 5,
        price: 149,
      },
    ],
    quantity: 1,
    unit: "something",
  },
  {
    id: 3,
    title: "Fire Safety Certificate",
    name: "com_fire_safety",
    priceData: [
      {
        bedrooms: 0, // 0 is for studio_flat
        price: 79,
      },
      {
        bedrooms: 1,
        price: 99,
      },
      {
        bedrooms: 2,
        price: 99,
      },
      {
        bedrooms: 3,
        price: 119,
      },
      {
        bedrooms: 4,
        price: 119,
      },
      {
        bedrooms: 5,
        price: 149,
      },
    ],
    quantity: 1,
    unit: "something",
  },
];
