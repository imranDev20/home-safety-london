import { Dayjs } from "dayjs";

export type ServiceFormInput = {
  propertyType: "residential" | "commercial";
  propertySubtype: "flat" | "house" | "hmo" | "";
  bedrooms: string;
  orderItems: {
    name: string;
    price: number;
    unit: string;
  }[];
};

export type PersonalFormInput = {
  name: string;
  email: string;
  phone: string;
  house: string;
  postCode: string;
  city: string;
  congestionArea: string;
  parkingOptions: string;
  inspectionDate: string;
  inspectionTime: string;
  orderNotes: string;
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
