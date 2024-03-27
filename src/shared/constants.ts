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
    ques: "What is the validity of an EICR",
    ans: "EICR is valid for 3-5 years",
    service: "Electrical Services",
    sub_service: "EICR",
  },
  {
    id: 2,
    // INSERT FROM REFERENCE WEBSITE
  },
];
