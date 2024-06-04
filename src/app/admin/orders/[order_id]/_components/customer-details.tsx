"use client";
import useOrderDetails from "@/app/_components/hooks/use-order-details";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/joy";
import React from "react";

interface InfoCellsProps {
  title: string;
  info: string | undefined;
}

function InfoCells({ title, info }: InfoCellsProps) {
  return (
    <Stack direction="row">
      <Box
        sx={{
          flex: 1,
        }}
        color="neutral"
      >
        <Typography>{title}</Typography>
      </Box>
      <Box
        sx={{
          flex: 2,
        }}
      >
        <Typography level="title-md">{info}</Typography>
      </Box>
    </Stack>
  );
}

export default function CustomerDetails() {
  const { orderDetails, isLoading } = useOrderDetails();

  return (
    <Box mt={3}>
      <Typography
        level="title-lg"
        sx={{
          mb: 1,
        }}
      >
        Customer Information
      </Typography>
      <Card>
        <CardContent orientation="vertical"></CardContent>
      </Card>
    </Box>
  );
}
