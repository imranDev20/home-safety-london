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
    name: "Electrical Safety",
  },
  {
    name: "Gas Safety",
  },
  {
    name: "Fire Safety",
  },
  {
    name: "Energy Performance",
  },
  {
    name: "Fire Risk Assessment",
  },
];
