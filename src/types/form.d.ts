import { Dayjs } from "dayjs";

export type ServiceFormInput = {
  propertyType: "residential" | "commercial";
  propertySubtype: "flat" | "house" | "hmo" | "";
  bedrooms: string;
  eicr: false;
  gas_cert: false;
  epc: false;
  pat: false;
  gas_boiler: false;
  fire_safety: false;
  fire_risk: false;
  emergency_light: false;
};

export type PersonalFormInput = {
  name: string;
  email: string;
  phone: string;
  house: string;
  postCode: string;
  city: string;
  parkingOptions: string;
};

export type ServiceType =
  | "eicr"
  | "gas_cert"
  | "epc"
  | "pat"
  | "gas_boiler"
  | "fire_safety"
  | "fire_risk"
  | "emergency_light";
