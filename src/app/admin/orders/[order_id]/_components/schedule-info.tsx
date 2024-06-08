"use client";
import useOrderDetails from "@/app/_components/hooks/use-order-details";
import useUpdateOrderDetails from "@/app/_components/hooks/use-update-order-details";
import { Close, Done, Edit } from "@mui/icons-material";
import {
  Card,
  CardContent,
  IconButton,
  Stack,
  Textarea,
  Typography,
} from "@mui/joy";
import React, { useEffect, useState } from "react";

export default function ScheduleInfo() {
  const { orderDetails } = useOrderDetails();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [orderNotes, setOrderNotes] = useState<string>("");

  const { updateOrderMutate, isPending: isUpdateOrderPending } =
    useUpdateOrderDetails();

  useEffect(() => {
    if (orderDetails) {
      setOrderNotes(orderDetails?.order_notes);
    }
  }, [orderDetails]);

  if (!orderDetails) {
    return "Failed to load data...";
  }

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
        <Typography level="title-lg">Schedule Info</Typography>

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

      {isEdit ? (
        <Textarea
          minRows={8}
          maxRows={8}
          autoFocus={isEdit}
          slotProps={{
            textarea: {
              maxLength: 250,
            },
          }}
          sx={{
            fontSize: "sm",
            lineHeight: 1.8,
            padding: "1rem",
          }}
          value={orderNotes}
          onChange={(e) => setOrderNotes(e.target.value)}
        />
      ) : (
        <Card>
          <CardContent>
            <Typography level="body-sm" lineHeight={1.8}>
              {orderDetails?.order_notes?.length !== 0
                ? orderDetails.order_notes
                : "No notes from customer"}
            </Typography>
          </CardContent>
        </Card>
      )}
    </>
  );
}
