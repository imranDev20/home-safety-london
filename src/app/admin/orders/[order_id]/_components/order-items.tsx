"use client";

import useOrderDetails from "@/app/_components/hooks/use-order-details";
import useUpdateOrderDetails from "@/app/_components/hooks/use-update-order-details";
import DataTable from "@/app/admin/customers/_components/data-table";
import { Close, Done, Edit } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Sheet,
  Stack,
  Typography,
} from "@mui/joy";
import React, { useState } from "react";
import { IOrderItem } from "@/types/orders";

const columns = [
  {
    label: "ITEM",
    key: "title",
    width: 240,
  },
  {
    label: "QUANTITY",
    key: "quantity",
    width: 150,
    render: (value: string, row: IOrderItem) => (
      <Typography>
        {row.quantity} {row.unit}
      </Typography>
    ),
  },
  {
    label: "PRICE",
    key: "price",
    width: 50,
    render: (value: string, row: IOrderItem) => (
      <Typography level="title-sm">£{row.price}</Typography>
    ),
  },
];

export default function OrderItems() {
  const { orderDetails } = useOrderDetails();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const { updateOrderMutate, isPending: isUpdateOrderPending } =
    useUpdateOrderDetails();

  return (
    <>
      <Typography
        level="title-lg"
        sx={{
          mb: 2,
        }}
      >
        Order Items
      </Typography>

      <Sheet
        variant="outlined"
        sx={{
          borderRadius: "sm",
        }}
      >
        {orderDetails?.order_status && (
          <DataTable data={orderDetails?.order_items} columns={columns} />
        )}
      </Sheet>
    </>
  );
}
