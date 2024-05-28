import {
  Avatar,
  Box,
  Button,
  Sheet,
  Stack,
  Typography,
  useTheme,
} from "@mui/joy";
import React from "react";
import DataTable from "../../_components/data-table";
import { useQuery } from "@tanstack/react-query";
import { CustomersResponse } from "../../_components/customers-table";
import { getUsers } from "@/services/user.services";
import dayjs from "dayjs";
import { User } from "@/types/user";
import { customSlugify } from "@/shared/functions";
import { useRouter } from "next/navigation";

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
  { label: "JOINED", key: "createdAt", width: 90 },
];

const CustomerOrders = () => {
  const router = useRouter();
  const theme = useTheme();

  const {
    data: usersData,
    isLoading: isGetUsersDataLoading,
    isFetching: isGetUserDataFetching,
    refetch: refetchGetUsers,
  } = useQuery<CustomersResponse>({
    queryKey: ["users"],
    queryFn: async () => {
      const { data, message, pagination } = await getUsers();

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

  if (isGetUserDataFetching || isGetUsersDataLoading) {
    return "Loading...";
  }

  return (
    <>
      <Typography level="h4" mb={2}>
        Orders
      </Typography>
      <Stack direction="row" spacing={1}>
        <Button size="sm" variant="outlined" color="primary">
          All Orders
        </Button>
        <Button size="sm" variant="outlined" color="neutral">
          Processing
        </Button>
        <Button size="sm" variant="outlined" color="neutral">
          Completed
        </Button>
        <Button size="sm" variant="outlined" color="neutral">
          Cancelled
        </Button>
      </Stack>
      <Sheet
        variant="outlined"
        sx={{
          borderRadius: "sm",
          p: 0,
          mt: 3,
        }}
      >
        <DataTable
          columns={columns}
          data={usersData?.users as User[]}
          onRowClick={handleRowClick}
          onSelectionChange={handleSelectionChange}
        />
      </Sheet>
    </>
  );
};

export default CustomerOrders;
