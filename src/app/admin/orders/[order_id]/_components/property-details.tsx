"use client";
import { CongestionChargeIcon } from "@/app/_components/common/icons";
import useOrderDetails from "@/app/_components/hooks/use-order-details";
import useUpdateOrderDetails from "@/app/_components/hooks/use-update-order-details";
import { CONGESTION_ZONE_OPTIONS, PARKING_OPTIONS } from "@/shared/constants";
import {
  Apartment,
  ApartmentOutlined,
  BedOutlined,
  Close,
  DirectionsCarOutlined,
  Done,
  Edit,
  HomeOutlined,
  HouseOutlined,
  MapOutlined,
  PhoneOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/joy";
import React, { useState } from "react";

export default function PropertyDetails() {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { orderDetails } = useOrderDetails();

  const { updateOrderMutate, isPending: isUpdateOrderPending } =
    useUpdateOrderDetails();

  if (!orderDetails) {
    return "Failed to load data...";
  }

  return (
    <Box mt={3}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          mb: 1,
        }}
      >
        <Typography level="title-lg">Property Details</Typography>

        <Stack spacing={1} direction="row">
          {isEdit && (
            <>
              <IconButton
                size="sm"
                disabled={isUpdateOrderPending}
                onClick={() => setIsEdit((prev) => !prev)}
                color="danger"
              >
                <Close />
              </IconButton>
              <IconButton
                size="sm"
                loading={isUpdateOrderPending}
                color="success"
              >
                <Done />
              </IconButton>
            </>
          )}

          {!isEdit && (
            <IconButton size="sm" onClick={() => setIsEdit((prev) => !prev)}>
              <Edit
                sx={{
                  fontSize: 16,
                }}
              />
            </IconButton>
          )}
        </Stack>
      </Stack>

      <Card>
        <CardContent orientation="vertical">
          <Stack spacing={2}>
            <Stack direction="row" spacing={1} alignItems="center">
              <HomeOutlined
                sx={{
                  fontSize: 20,
                }}
              />
              <Typography
                level="title-sm"
                sx={{
                  textTransform: "capitalize",
                }}
              >
                {orderDetails.property_type}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1}>
              <ApartmentOutlined
                sx={{
                  fontSize: 20,
                }}
              />
              <Typography
                level="title-sm"
                sx={{
                  textTransform: "capitalize",
                }}
              >
                {orderDetails.resident_type || "N/A"}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1}>
              <BedOutlined
                sx={{
                  fontSize: 20,
                }}
              />
              <Typography
                level="title-sm"
                sx={{
                  textTransform: "capitalize",
                }}
              >
                {orderDetails.bedrooms
                  ? orderDetails.bedrooms !== "studio_flat"
                    ? orderDetails.bedrooms + " bedrooms"
                    : orderDetails.bedrooms
                  : "N/A"}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1}>
              <DirectionsCarOutlined
                sx={{
                  fontSize: 20,
                }}
              />
              <Typography
                level="title-sm"
                sx={{
                  textTransform: "capitalize",
                }}
              >
                {
                  PARKING_OPTIONS.find(
                    (option) =>
                      option.value === orderDetails.parking_options.parking_type
                  )?.name
                }
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1}>
              <CongestionChargeIcon
                sx={{
                  fontSize: 20,
                }}
              />
              <Typography
                level="title-sm"
                sx={{
                  textTransform: "capitalize",
                }}
              >
                {
                  CONGESTION_ZONE_OPTIONS.find(
                    (option) =>
                      option.value === orderDetails.congestion_zone.zone_type
                  )?.nameAlt
                }
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
