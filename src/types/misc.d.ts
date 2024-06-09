import { SvgIconComponent } from "@mui/icons-material";
import { Dayjs } from "dayjs";
import { Dispatch, SetStateAction } from "react";

// These are confirmed to be in use
export type Pagination = {
  currentPage: number;
  totalPages: number;
  totalCount: number;
};

export type ComponentUseStateProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export type ChildrenProp = {
  children: React.ReactNode;
};
