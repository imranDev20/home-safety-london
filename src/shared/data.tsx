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

export const FAQS = [
  {
    id: 1,
    ques: "What is the validity of an EICR",
    ans: "EICR is valid for 3-5 years",
    service: "Electrical Services",
    sub_service: "EICR",
  },
  {
    id: 2,
    ques: "What is validity of PAT Testing?",
    ans: "Pat testing is valid for 1 year.",
    service: "Electrical Services",
    sub_service: "PAT",
  },
  {
    id: 3,
    ques: "What is the validity of GAS SAFETY Certificate",
    ans: "Gas safety certificate is valid for 1 year.",
    service: "Gas Services",
    sub_service: "Gas Certificate",
  },
  {
    id: 4,
    ques: "What is turnaround time for fire alarm certificate?",
    ans: "London Property Inspections can carry out an fire alarm inspection within 24 hours if customer need an report on urgent basis. Sometimes we carry out an inspection on the same day.",
    service: "Fire Services",
    sub_service: "Fire Alarm Certificate",
  },
  {
    id: 5,
    ques: "What is the validity of EPC?",
    ans: "EPC is valid for 10 years.",
    service: "Health & Safety",
    sub_service: "EPC",
  },
  {
    id: 6,
    ques: "How can I know the electrician is qualified?",
    ans: "All of our electricians (contractors) are qualified with NICEIC, NAPIT and STROMA. Registration number of electricians is provided to customer for verification purposes prior to the inspection",
    service: "Electrical Services",
    sub_service: "EICR",
  },
  {
    id: 7,
    ques: "How do I receive fire alarm certificate?",
    ans: "Fire alarm certificate is provided in digital format (pdf) via email. You can also download it from our website.",
    service: "Fire Services",
    sub_service: "Fire Alarm Certificate",
  },
];
