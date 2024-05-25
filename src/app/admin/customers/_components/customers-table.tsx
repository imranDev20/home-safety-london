"use client";
import React from "react";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Sheet from "@mui/joy/Sheet";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useRouter, useSearchParams } from "next/navigation";
import { FIXED_HEIGHT } from "@/shared/constants";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/services/user.services";
import dayjs from "dayjs";
import { Pagination } from "@/types/misc";
import { User } from "@/types/user";
import DataTable from "./data-table";
import { customSlugify } from "@/shared/functions";

export type CustomersResponse = {
  users: Partial<User>[];
  message: string;
  pagination: Pagination;
};

// function descendingComparator<T>(a: T, b: T, orderBy: keyof T): number {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// type Order = "asc" | "desc";

// function getComparator<Key extends keyof any>(
//   order: Order,
//   orderBy: Key
// ): (
//   a: { [key in Key]: number | string },
//   b: { [key in Key]: number | string }
// ) => number {
//   return order === "desc"
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort<T>(
//   array: readonly T[],
//   comparator: (a: T, b: T) => number
// ): T[] {
//   const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) {
//       return order;
//     }
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

const columns = [
  {
    label: "CUSTOMER",
    key: "name",
    width: 180,
    render: (value: string, row: User) => (
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Avatar size="sm" variant="outlined">
          {row.name?.charAt(0)}
        </Avatar>
        <Typography level="body-xs">{value}</Typography>
      </Box>
    ),
  },
  { label: "EMAIL", key: "email", width: 150 },
  { label: "PHONE", key: "phone", width: 120 },
  { label: "ADDRESS", key: "address", width: 110 },
  { label: "JOINED", key: "createdAt", width: 90 },
];

export default function CustomersTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  const {
    data: usersData,
    isLoading: isGetUsersDataLoading,
    isFetching: isGetUserDataFetching,
    refetch: refetchGetUsers,
  } = useQuery<CustomersResponse>({
    queryKey: ["users"],
    queryFn: async () => {
      const { data, message, pagination } = await getUsers(searchTerm);

      const users = data?.map((user: any) => ({
        _id: user._id,
        createdAt: dayjs(user.createdAt).format("MMM DD, YYYY"),
        name: user.name,
        email: user.email,
        phone: user.phone,
        // address: user.
      }));

      return {
        users,
        message,
        pagination,
      };
    },
    refetchOnMount: false,
  });

  const handleRowClick = (row: User) => {
    router.push(`/admin/customers/${customSlugify(row._id)}`);
  };

  const handleSelectionChange = (selected: User[]) => {
    console.log("Selection changed:", selected);
  };

  // useEffect(() => {
  //   refetchGetUsers();
  // }, [searchTerm, refetchGetUsers]);

  if (isGetUsersDataLoading || isGetUserDataFetching) {
    return "loading...";
  }

  return (
    <React.Fragment>
      <Sheet
        variant="outlined"
        sx={{
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          overflow: "auto",
          minHeight: `calc(100vh - ${FIXED_HEIGHT}px)`,
          height: `calc(100vh - ${FIXED_HEIGHT}px)`,
        }}
      >
        <DataTable<User>
          columns={columns}
          data={usersData?.users as User[]}
          onRowClick={handleRowClick}
          onSelectionChange={handleSelectionChange}
        />
      </Sheet>

      <Box
        sx={{
          pt: 2,
          gap: 1,
          [`& .${iconButtonClasses.root}`]: { borderRadius: "50%" },
          display: {
            xs: "none",
            md: "flex",
          },
        }}
      >
        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          startDecorator={<KeyboardArrowLeftIcon />}
        >
          Previous
        </Button>

        <Box sx={{ flex: 1 }} />
        {["1", "2", "3", "…", "8", "9", "10"].map((page) => (
          <IconButton
            key={page}
            size="sm"
            variant={Number(page) ? "outlined" : "plain"}
            color="neutral"
          >
            {page}
          </IconButton>
        ))}
        <Box sx={{ flex: 1 }} />

        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          endDecorator={<KeyboardArrowRightIcon />}
        >
          Next
        </Button>
      </Box>
    </React.Fragment>
  );
}
