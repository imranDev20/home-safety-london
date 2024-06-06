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
  Stack,
  Typography,
} from "@mui/joy";
import React, { useState } from "react";
import Assignee from "../../_components/assignee";
import { IOrderItem } from "@/types/orders";

type OrderItemProps = {
  item: IOrderItem;
};

export default function OrderItem({ item }: OrderItemProps) {
  return (
    <Box key={item._id}>
      <Box>
        <Grid container spacing={3}>
          <Grid xs={8}>
            <Stack spacing={0.5}>
              <Typography level="body-xs">Service Name</Typography>
              <Typography level="title-md">{item.name}</Typography>
            </Stack>
          </Grid>

          <Grid xs={2}>
            <Stack spacing={0.5}>
              <Typography level="body-xs">Quantity</Typography>
              <Typography level="title-md">
                {item.quantity} {item.unit}
              </Typography>
            </Stack>
          </Grid>

          <Grid xs={2}>
            <Stack spacing={0.5}>
              <Typography level="body-xs">Price</Typography>
              <Typography
                level="title-md"
                sx={{
                  ml: 10,
                }}
              >
                £{item.price}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
