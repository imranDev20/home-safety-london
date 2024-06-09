"use client";
import useOrderDetails from "@/app/_components/hooks/use-order-details";
import useUpdateOrderDetails from "@/app/_components/hooks/use-update-order-details";
import {
  Close,
  Done,
  Edit,
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
import { Types } from "mongoose";
import React, { useEffect, useState } from "react";

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
  const { orderDetails } = useOrderDetails();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [orderNotes, setOrderNotes] = useState<string>("");

  console.log(orderDetails);

  const { updateOrderMutate, isPending: isUpdateOrderPending } =
    useUpdateOrderDetails();

  useEffect(() => {
    if (orderDetails?.order_notes) {
      setOrderNotes(orderDetails?.order_notes);
    }
  }, [orderDetails]);

  if (!orderDetails) {
    return "Failed to load data...";
  }

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          mb: 1,
        }}
      >
        <Typography level="title-lg">Customer Details</Typography>

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
                onClick={async () => {
                  const response = await updateOrderMutate({
                    ...orderDetails,
                    customer: new Types.ObjectId(orderDetails.customer._id),
                    order_notes: orderNotes,
                  });

                  if (response.success) {
                    setIsEdit((prev) => !prev);
                  }
                }}
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
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar>{orderDetails?.customer?.name?.charAt(0)}</Avatar>

            <Stack>
              <Typography level="title-md">
                {orderDetails.customer?.name}
              </Typography>
              <Typography level="body-sm">
                {orderDetails.customer?.email}
              </Typography>
            </Stack>
          </Stack>

          <Stack spacing={2} mt={3}>
            <Stack direction="row" spacing={1} alignItems="center">
              <PhoneOutlined
                sx={{
                  fontSize: 20,
                }}
              />
              <Typography level="title-sm">
                {orderDetails.customer?.phone}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1}>
              <MapOutlined
                sx={{
                  fontSize: 20,
                }}
              />
              <Typography level="title-sm">
                {orderDetails?.customer?.address?.street},{" "}
                {orderDetails?.customer?.address?.city}{" "}
                {orderDetails?.customer?.address?.postcode}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
