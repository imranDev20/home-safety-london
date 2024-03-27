import {
  Dashboard,
  Diversity2,
  Group,
  Notifications,
  Settings,
  ShoppingCart,
  Support,
} from "@mui/icons-material";

import {
  EicrIcon,
  EpcIcon,
  FireIcon,
  FireRiskIcon,
  GasSafteyIcon,
  PatIcon,
} from "@/app/_components/common/icons";

import ElectricImage from "@/images/electric.jpg";

export const ADMIN_OPTIONS = [
  {
    route: "/admin",
    label: "Dashboard",
    Icon: Dashboard,
  },
  {
    route: "/admin/orders",
    label: "Orders",
    Icon: ShoppingCart,
  },
  {
    route: "/admin/customers",
    label: "Customers",
    Icon: Group,
  },
  {
    route: "/admin/team",
    label: "Team",
    Icon: Diversity2,
  },
  {
    route: "/admin/notifications",
    label: "Notifications",
    Icon: Notifications,
  },
  {
    route: "/admin/support",
    label: "Support",
    Icon: Support,
  },
  {
    route: "/admin/settings",
    label: "Settings",
    Icon: Settings,
  },
];

export const SITE_OPTIONS = [
  {
    route: "/",
    label: "Home",
  },
  {
    route: "/about-us",
    label: "About us",
  },
  {
    route: "/services",
    label: "Services",
  },
  {
    route: "/contact",
    label: "Contact",
  },
  {
    route: "/terms-and-conditions",
    label: "Terms & Conditions",
  },
  {
    route: "/privacy-policy",
    label: "Privacy Policy",
  },
];

export const ORDER_STATUS = [
  "pending",
  "processing",
  "scheduled",
  "in_progress",
  "completed",
  "cancelled",
  "on_hold",
  "payment_pending",
  "payment_received",
];

export const CATEGORIES = [
  {
    name: "Electrical Services",
  },
  {
    name: "Gas Services",
  },
  {
    name: "Fire Services",
  },
  {
    name: "Health & Safety",
  },
];

export const PRICE_INFO = [
  {
    service: "gas",
    label: "Gas",
    type: "appliances",
    price: [
      {
        quantity: "1",
        price: 80,
      },
      {
        quantity: "2",
        price: 100,
      },
      { quantity: "3", price: 120 },
    ],
  },
  {
    service: "eicr",
    label: "EICR",
    type: "fuseBoards",
    price: [
      {
        quantity: "1",
        price: 150,
      },
      {
        quantity: "2",
        price: 200,
      },
      { quantity: "3", price: "Call for Price" },
    ],
  },
  {
    service: "epc",
    label: "EPC",
    type: "bedRooms",
    price: [
      {
        quantity: "0-3",
        price: 80,
      },
      {
        quantity: "4-6",
        price: 100,
      },
    ],
  },
];

// INSERT CORRESPONDING IMAGE AND DATA HERE
export const SERVICES = [
  {
    id: 1,
    title: "Electrical Services",
    route: "/electrical-services",
    description: "Description of Electrical Services goes here...",
    sub_services: [
      {
        id: 1,
        route: "/eicr",
        title: "EICR Certificate",
        Icon: EicrIcon,
        image: ElectricImage,
        description: "Description of Electrical Services goes here...",
        residential: {
          unit: "bedrooms",
          pricing: [
            { units: "Studio Flat", price: 79 },
            { units: "1-2 bedrooms", price: 99 },
            { units: "3-4 bedrooms", price: 119 },
            { units: "5-6 bedrooms", price: 149 },
          ],
        },
        commercial: {
          unit: "circuits",
          pricing: [
            { units: "1-5 circuits", price: 150 },
            { units: "6-10 circuits", price: 199 },
            { units: "11-20 circuits", price: 249 },
          ],
        },
      },
      {
        id: 2,
        route: "/pat",
        title: "Portable Appliance Testing",
        accronym: "PAT",
        Icon: PatIcon,
        image: ElectricImage,
        description: "Description of Electrical Services goes here...",
        commercial: [
          { units: "1-10 items", price: 150 },
          { units: "6-10 circuits", price: 199 },
          { units: "11-20 circuits", price: 249 },
        ],
        residential: [{ units: "Studio Flat", price: 79 }],
      },
    ],
  },
  {
    id: 2,
    title: "Gas Services",
    route: "/gas-services",
    description: "Description of Gas Services goes here...",
    image: "gas.jpg",

    // INSERT CORRESPONDING DATA
    sub_services: [
      {
        id: 1,
        route: "/eicr",
        title: "EICR Certificate",
        Icon: EicrIcon,
        image: ElectricImage,
        description: "Description of Electrical Services goes here...",
        residential: {
          unit: "bedrooms",
          pricing: [
            { units: "Studio Flat", price: 79 },
            { units: "1-2 bedrooms", price: 99 },
            { units: "3-4 bedrooms", price: 119 },
            { units: "5-6 bedrooms", price: 149 },
          ],
        },
        commercial: {
          unit: "circuits",
          pricing: [
            { units: "1-5 circuits", price: 150 },
            { units: "6-10 circuits", price: 199 },
            { units: "11-20 circuits", price: 249 },
          ],
        },
      },
      {
        id: 2,
        route: "/pat",
        title: "Portable Appliance Testing",
        accronym: "PAT",
        Icon: PatIcon,
        image: ElectricImage,
        description: "Description of Electrical Services goes here...",
        commercial: [
          { units: "1-10 items", price: 150 },
          { units: "6-10 circuits", price: 199 },
          { units: "11-20 circuits", price: 249 },
        ],
        residential: [{ units: "Studio Flat", price: 79 }],
      },
    ],
  },
  {
    id: 3,
    title: "Fire Services",
    route: "/fire-services",
    description: "Description of Fire Services goes here...",
    image: "fire.jpg",

    // INSERT CORRESPONDING DATA
    sub_services: [
      {
        id: 1,
        route: "/eicr",
        title: "EICR Certificate",
        Icon: EicrIcon,
        image: ElectricImage,
        description: "Description of Electrical Services goes here...",
        residential: {
          unit: "bedrooms",
          pricing: [
            { units: "Studio Flat", price: 79 },
            { units: "1-2 bedrooms", price: 99 },
            { units: "3-4 bedrooms", price: 119 },
            { units: "5-6 bedrooms", price: 149 },
          ],
        },
        commercial: {
          unit: "circuits",
          pricing: [
            { units: "1-5 circuits", price: 150 },
            { units: "6-10 circuits", price: 199 },
            { units: "11-20 circuits", price: 249 },
          ],
        },
      },
      {
        id: 2,
        route: "/pat",
        title: "Portable Appliance Testing",
        accronym: "PAT",
        Icon: PatIcon,
        image: ElectricImage,
        description: "Description of Electrical Services goes here...",
        commercial: [
          { units: "1-10 items", price: 150 },
          { units: "6-10 circuits", price: 199 },
          { units: "11-20 circuits", price: 249 },
        ],
        residential: [{ units: "Studio Flat", price: 79 }],
      },
    ],
  },
  {
    id: 4,
    title: "Health & Safety",
    route: "/health-safety",
    description: "Description of Health & Safety Services goes here...",
    image: "health.jpg",

    // INSERT CORRESPONDING DATA
    sub_services: [
      {
        id: 1,
        route: "/eicr",
        title: "EICR Certificate",
        Icon: EicrIcon,
        image: ElectricImage,
        description: "Description of Electrical Services goes here...",
        residential: {
          unit: "bedrooms",
          pricing: [
            { units: "Studio Flat", price: 79 },
            { units: "1-2 bedrooms", price: 99 },
            { units: "3-4 bedrooms", price: 119 },
            { units: "5-6 bedrooms", price: 149 },
          ],
        },
        commercial: {
          unit: "circuits",
          pricing: [
            { units: "1-5 circuits", price: 150 },
            { units: "6-10 circuits", price: 199 },
            { units: "11-20 circuits", price: 249 },
          ],
        },
      },
      {
        id: 2,
        route: "/pat",
        title: "Portable Appliance Testing",
        accronym: "PAT",
        Icon: PatIcon,
        image: ElectricImage,
        description: "Description of Electrical Services goes here...",
        commercial: [
          { units: "1-10 items", price: 150 },
          { units: "6-10 circuits", price: 199 },
          { units: "11-20 circuits", price: 249 },
        ],
        residential: [{ units: "Studio Flat", price: 79 }],
      },
    ],
  },
];

export const FAQS = [
  {
    id: 1,
    ques: "Fire risk assessment responsibilities",
    ans: "Home safety London are responsible for conducting a fire risk assessment in their properties. This assessment ensures the safety of tenants by identifying and addressing potential fire hazards. It is a legal obligation, and landlords must take necessary measures to minimize risks and protect occupants.",
    
  },
  {
    id: 2,
    ques: "EPC (Energy Performance Certificate) for Home Safety London",
    ans: "Home Safety London are required to obtain an EPC, which rates the energy efficiency of their property. It provides valuable information to tenants about energy consumption and costs.",
  },
  {
    id: 3,
    ques: "EICR (Electrical Installation Condition Report)",
    ans: "Home Safety London must arrange an EICR to assess the electrical safety of their property. This report identifies any potential hazards, ensuring the electrical installations meet safety standards. It is a legal requirement to obtain a valid EICR.",
  },
  {
    id: 4,
    ques: "Do i need a Gas Safety Certs CP12 & 42 ?",
    ans: "Home Safety London must prioritize gas safety by conducting annual gas safety checks on their properties. This ensures that gas appliances and installations are in good condition, minimizing the risk of gas leaks. A Gas Safety Certificate is issued upon completion, assuring tenants of a safe living environment. Compliance with gas safety regulations is a legal obligation for Home Safety.",
  },
  {
    id: 5,
    ques: "What should i do if the record for Gas safety show defects?",
    ans: "The gas safety check records serve as a crucial indicator of the property's safety against gas leakages. Upon the completion of the annual gas safety check, a safety certificate is issued to assure tenants of the property's safety. The gas safety record is generated at the conclusion of the check, encompassing details of any defects identified within the property.",
  },
  {
    id: 6,
    ques: "Should i test and inspect all my gas appliances?",
    ans: "Yes, We would recommend you have all your appliances tested and certified by Landlords Checks. We offer continuous support and advice.",
  },
  {
    id: 7,
    ques: "What necessary steps should be taken if the defects are found during the annual gas safety check?",
    ans: "If any fault is found during the inspection, is it the property owners responsibility to source a company to fix the defect. The record made during the check should be provided to the landlord as soon as possible so that they can perform necessary actions. A landlord should ensure that his property is safe and secure for the tenants to live.",
  },
];
