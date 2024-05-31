import { SvgIconComponent } from "@mui/icons-material";
import { Dayjs } from "dayjs";
import { Dispatch, SetStateAction } from "react";

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

// These are confirmed to be in use
export type Pagination = {
  currentPage: number;
  totalPages: number;
  totalCount: number;
};

export type Role = "customer" | "engineer" | "admin";

export type ComponentUseStateProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};
