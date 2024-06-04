"use client";

import useOrderDetails from "@/app/_components/hooks/use-order-details";
import { Edit } from "@mui/icons-material";
import { Card, CardContent, IconButton, Stack, Typography } from "@mui/joy";
import React from "react";

export default function OrderItems() {
  const { orderDetails } = useOrderDetails();
  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          mb: 1,
        }}
      >
        <Typography level="title-lg">Order Notes</Typography>

        <IconButton>
          <Edit
            sx={{
              fontSize: 16,
            }}
          />
        </IconButton>
      </Stack>
      <Card>
        <CardContent orientation="vertical"></CardContent>
      </Card>
    </>
  );
}
