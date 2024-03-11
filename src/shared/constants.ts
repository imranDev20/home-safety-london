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
  { id: 1, serviceName: "EICR", serviceDetail: "Electrical Certificate" },
  { id: 2, serviceName: "Fire", serviceDetail: "Risk Assessment" },
  { id: 3, serviceName: "Fire", serviceDetail: "Alarm Certificate" },
  { id: 4, serviceName: "PAT", serviceDetail: "Testing" },
  { id: 5, serviceName: "GAS", serviceDetail: "Safety Certificate" },
  {
    id: 6,
    serviceName: "EPC",
    serviceDetail: "Energy Performancer Certificate",
  },
  { id: 7, serviceName: "Fire", serviceDetail: "Alarm Installation" },
  { id: 8, serviceName: "Fuse", serviceDetail: "Box Installation" },
  { id: 9, serviceName: "Boiler", serviceDetail: "Box Installation" },
  { id: 10, serviceName: "Electrial", serviceDetail: "Repairs" },
  { id: 11, serviceName: "GAS", serviceDetail: "Repairs" },
  { id: 12, serviceName: "Plumbing", serviceDetail: "" },
];
