// Admin Panel
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
  PlumbingIcon,
} from "@/app/_components/common/icons";

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

// Website

export const SERVICES = [
  {
    id: 1,
    serviceName: "EICR",
    serviceDetail: "Electrical Certificate",
    Icon: EicrIcon,
  },
  {
    id: 2,
    serviceName: "Fire",
    serviceDetail: "Risk Assessment",
    Icon: FireRiskIcon,
  },
  {
    id: 3,
    serviceName: "Fire",
    serviceDetail: "Alarm Certificate",
    Icon: FireIcon,
  },
  { id: 4, serviceName: "PAT", serviceDetail: "Testing", Icon: PatIcon },
  {
    id: 5,
    serviceName: "GAS",
    serviceDetail: "Safety Certificate",
    Icon: GasSafteyIcon,
  },
  {
    id: 6,
    serviceName: "EPC",
    serviceDetail: "Energy Performancer Certificate",
    Icon: EpcIcon,
  },
  {
    id: 7,
    serviceName: "Fire",
    serviceDetail: "Alarm Installation",
    Icon: FireIcon,
  },
  {
    id: 8,
    serviceName: "Fuse",
    serviceDetail: "Box Installation",
    Icon: FireRiskIcon,
  },
  {
    id: 9,
    serviceName: "Boiler",
    serviceDetail: "Box Installation",
    Icon: EpcIcon,
  },
  {
    id: 10,
    serviceName: "Electrial",
    serviceDetail: "Repairs",
    Icon: EicrIcon,
  },
  { id: 11, serviceName: "GAS", serviceDetail: "Repairs", Icon: GasSafteyIcon },
];

export const priceInfo = [
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
