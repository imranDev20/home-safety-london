import { Button, Sheet, Stack, Typography, useTheme } from "@mui/joy";
import React from "react";
import DataTable from "../../_components/data-table";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { IUser } from "@/types/user";
import {
  customSlugify,
  getMostRecentStatus,
  snakeCaseToNormalText,
} from "@/shared/functions";
import { useRouter } from "next/navigation";
import { getOrders } from "@/services/orders.services";

const columns = [
  {
    label: "Invoice ID",
    key: "invoice_id",
    width: 180,
    render: (value: string, row: IUser) => (
      <Typography level="body-sm">{value}</Typography>
    ),
  },
  {
    label: "Order Status",
    key: "order_status",
    width: 90,
    render: (value: string, row: any) => {
      const status = getMostRecentStatus(row?.order_status);
      return (
        <Typography
          level="body-sm"
          sx={{
            textTransform: "capitalize",
          }}
        >
          {snakeCaseToNormalText(status as string)}
        </Typography>
      );
    },
  },
  {
    label: "Order Placed",
    key: "createdAt",
    width: 90,
    render: (value: string, row: IUser) => (
      <Typography level="body-sm">
        {dayjs(value).format("DD/MM/YYYY")}
      </Typography>
    ),
  },
  {
    label: "Invoice",
    width: 90,
    key: "invoice",
    render: (value: string, row: IUser) => (
      <Button
        component="a"
        href={value}
        size="sm"
        target="_blank"
        sx={{
          fontSize: 12,
        }}
      >
        Download
      </Button>
    ),
  },
];

export default function CustomerOrders() {
  const router = useRouter();
  const theme = useTheme();

  const {
    data: ordersData,
    isLoading: isGetUsersDataLoading,
    isFetching: isGetUserDataFetching,
    refetch: refetchGetUsers,
  } = useQuery<any>({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data, message, pagination } = await getOrders();

      const orders = data?.map((order: any) => ({
        _id: order._id,
        createdAt: dayjs(order.createdAt).format("MMM DD, YYYY"),
        order_status: order.order_status,
        invoice_id: order.invoice_id,
        email: order.email,
        phone: order.phone,
      }));

      return {
        orders,
        message,
        pagination,
      };
    },
    refetchOnMount: false,
  });

  const handleRowClick = (row: IUser) => {
    router.push(`/admin/customers/${customSlugify(row._id.toString())}`);
  };

  const handleSelectionChange = (selected: IUser[]) => {
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
        {ordersData?.orders && (
          <DataTable
            columns={columns}
            data={ordersData.orders}
            onRowClick={handleRowClick}
            onSelectionChange={handleSelectionChange}
          />
        )}
      </Sheet>
    </>
  );
}
