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
  EicrOutlinedTwoIcon,
  EpcIcon,
  FireAlarmOutlinedIcon,
  FireRiskIcon,
  FireRiskOutlinedIcon,
  GasOutlinedIcon,
  PatOutlinedIcon,
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
    isShowInHeader: true,
  },
  {
    route: "/about",
    label: "About us",
    isShowInHeader: true,
  },
  {
    route: "/services",
    label: "Services",
    isShowInHeader: true,
  },
  {
    route: "/contact",
    label: "Contact",
    isShowInHeader: true,
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
        Icon: EicrOutlinedTwoIcon,
        image: ElectricImage,
        description:
          "An electrical installation condition report previously known as (periodic electrical inspection) is an inspection on the condition of an existing electrical installation, to identify if any part of the installation does not meet current British standards.",
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
        Icon: PatOutlinedIcon,
        image: ElectricImage,
        description:
          "PAT stands for portable appliance testing, a procedure in which electrical portable appliances are tested/inspected by a certified electrician registered with a body e.g. NICEIC or NAPIT.",
        residential: [
          { units: "1-10 items", price: 59 },
          { units: " 11-20 items", price: 79 },
          { units: " 21-40 items", price: 99 },
        ],
        commercial: [
          { units: "1-10 items", price: 150 },
          { units: "11-20 circuits", price: 199 },
          { units: "21-30 circuits", price: 249 },
          { units: "Any extra item", price: 249 },
        ],
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
        route: "/gas-certificate",
        title: "Gas Certificate",
        Icon: GasOutlinedIcon,
        image: ElectricImage,
        description:
          "Gas Safety certificate is a document which affirms that inspection of all gas appliances is carried out in the property to make sure gas pipework, flues and each gas appliance are working properly, there is no danger and are checked during gas safety check by a gas safe registered engineer.",
        residential: {
          unit: "bedrooms",
          pricing: [
            { units: "1-2 gas appliances ", price: 79 },
            { units: " 3 gas appliances ", price: 99 },
            { units: "4 gas appliances", price: 119 },
          ],
        },
        commercial: {
          unit: "circuits",
          pricing: [{ units: "Starting from", price: 150 }],
        },
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
        route: "/fire-alarm-certificate",
        title: "Fire Alarm Certificate",
        Icon: FireAlarmOutlinedIcon,
        image: ElectricImage,
        description:
          "Fire alarm certificate is a document/report issued by a qualified electrician after inspection and testing of the property’s alarms in accordance with regulation BS5839. These rules and regulations are part of the fire detection and fire alarm systems for building, they cover design commissioning and maintenance.",
        residential: {
          unit: "bedrooms",
          pricing: [
            { units: "1-3 detectors", price: 79 },
            { units: "Any extra detector", price: 99 },
          ],
        },
        commercial: {
          unit: "circuits",
          pricing: [
            { units: "1-3 detectors", price: 150 },
            { units: "Any extra detector", price: 199 },
          ],
        },
      },
      {
        id: 2,
        route: "/fire-risk-assessment",
        title: "Fire Risk Assessment",
        Icon: FireRiskOutlinedIcon,
        image: ElectricImage,
        description:
          "A fire risk assessment is a systematic evaluation of a building or premises to identify potential fire hazards and assess the level of risk they pose. The purpose of a fire risk assessment is to make sure the safety of occupant and to implement appropriate fire safety measures to prevent fires and protect lives and property. We provide fire safety risk assessment service to landlords, homeowners, employers for residential homes, flats, HMO properties, offices and businesses respectively.",
        commercial: [
          { units: "Single storey communal area ", price: 150 },
          { units: "Two storey communal area", price: 199 },
          { units: " Three storey communal area", price: 249 },
        ],
        residential: [
          { units: "1-3 bedrooms", price: 79 },
          { units: " 4-6 bedrooms", price: 79 },
        ],
      },
      {
        id: 3,
        route: "/emergency-lighting-certificate",
        title: "Emergency Lighting Certificate",
        Icon: FireRiskIcon,
        image: ElectricImage,
        description:
          "The legal requirement is that non-domestic buildings must be safe at all times, even if mains power failure occurs. Therefore, nearly all such buildings must have emergency lighting fitted. The Industry Committee for Emergency Lighting (ICEL)",
        commercial: [{ units: "Single storey communal area ", price: 150 }],
        residential: [{ units: "1-3 bedrooms", price: 79 }],
      },
      {
        id: 4,
        route: "/fire-alarm-installation",
        title: "Fire Alarm Installation",
        Icon: FireRiskIcon,
        image: ElectricImage,
        description:
          "In the United Kingdom, BS5389 governs fire alarm installation. British Standards is abbreviated as BS, and the number 5389 refers to the specific standard for fire safety devices. According to this standard, a smoke sensor is a sensor that senses smoke by the heat of combustion products or any other particularly designed smoke-specific indication, in particular to use an alarm before smoke becomes thick enough just to react with an open fire’s flame.",
        commercial: [{ units: "Single storey communal area ", price: 150 }],
        residential: [{ units: "1-3 bedrooms", price: 79 }],
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
        route: "/energy-performance-certificate",
        title: "Energy Performance Certificate",
        Icon: EpcIcon,
        image: ElectricImage,
        description:
          "London Property Inspections residential energy certification team can provide your EPC quickly to make sure that your property is on the market in the shortest possible time. We have been known to produce certificates and have them back to the customers within 3 hours and have an average turnaround time of 2 days from processing of order to order completion.",
        residential: {
          unit: "bedrooms",
          pricing: [
            { units: "Studio Flat", price: 79 },
            { units: "1-3 bedrooms", price: 99 },
            { units: "4-6 bedrooms", price: 119 },
          ],
        },
        commercial: {
          unit: "circuits",
          pricing: [{ units: "Price starts from", price: 150 }],
        },
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

const MODIFIED_SERVICES = SERVICES.map((service) =>
  service.sub_services.map((s_service) => ({
    ...s_service,
    parentService: service.title,
  }))
);

export const SUB_SERVICES = MODIFIED_SERVICES.flatMap((service) => service);

// Keep these here. Move the rest to a separate file.
export const FIXED_HEIGHT: number = 285;
export const BUSINESS_NAME: string = "London Home Safety Limited";
export const ADDRESS: string = "43 Felton Road, Barking, London IG11 7YA";
export const PHONE_NO: string = "020 8146 6698";
export const WEBSITE_URL: string = "www.londonhomesafety.co.uk";
