import { Dayjs } from "dayjs";

export type ServiceFormInput = {
  isGas: boolean;
  isEicr: boolean;
  isEpc: boolean;
  appliances: string;
  fuseBoards: string;
  bedRooms: string;
  tflZone: string;
  time: string;
  date: Dayjs | null;
};

export type PersonalFormInput = {
  name: string;
  email: string;
  phone: string;
  house: string;
  postCode: string;
  city: string;
};
