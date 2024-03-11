import { SvgIconComponent } from "@mui/icons-material";
import { Dayjs } from "dayjs";

export type Faq = {
  id: number;
  ques: string;
  ans: string;
};

export type Service = {
  id: number;
  name: string;
  Icon: SvgIconComponent;
  description: string;
  slug: string;
  startingPrice: number;

  detailedPackages: {
    name: string;
    price: number;
  }[];

  additionalPackage?: {
    name: string;
    price: number;
  }[];
};

export type Order = {
  isGas: boolean;
  isEpc: boolean;
  isEicr: boolean;
  appliances: string;
  fuseBoards: string;
  bedRooms: string;
  tflZone: string;
  time: string;
  isServiceStepComplete: boolean;
  name: string;
  email: string;
  phone: string;
  house: string;
  postCode: string;
  city: string;
  isPersonalStepComplete: boolean;
  date: null | Dayjs;
};
