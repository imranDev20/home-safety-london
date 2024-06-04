"use client";
import CustomBreadcrumb from "@/app/_components/common/custom-breadcrumb";
import useOrderDetails from "@/app/_components/hooks/use-order-details";
import useUpdateOrderDetails from "@/app/_components/hooks/use-update-order-details";
import { ORDER_STATUS } from "@/shared/constants";
import { getMostRecentStatus, snakeCaseToNormalText } from "@/shared/functions";
import { OrderStatusValues } from "@/types/orders";
import { Download, MoreHoriz } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Link as JoyLink,
  Option,
  Select,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/joy";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function OrderDetailsHeader() {
  const { orderDetails, isLoading: isOrderDetailsLoading } = useOrderDetails();
  const { updateOrderMutate, isPending: isUpdateOrderDetailsLoading } =
    useUpdateOrderDetails();
  const theme = useTheme();
  const [orderStatus, setOrderStatus] = useState<OrderStatusValues>(
    "awaiting_confirmation"
  );

  const breadcrumbItems = [
    {
      label: "Orders",
      href: "/admin/orders",
    },
    {
      label: orderDetails?.invoice_id ?? "",
      isActive: true,
    },
  ];

  useEffect(() => {
    if (orderDetails) {
      setOrderStatus(getMostRecentStatus(orderDetails.order_status));
    }
  }, [orderDetails]);

  const handleStatusChange = async (value: OrderStatusValues) => {
    setOrderStatus(value);
    if (!orderDetails) {
      return;
    }

    const payload = {
      ...orderDetails,
      order_status: [
        ...(orderDetails?.order_status ?? []),
        {
          status: value,
          timestamp: new Date(),
        },
      ],
    };

    const response = await updateOrderMutate(payload);

    if (!response.success) {
      setOrderStatus(getMostRecentStatus(response.data.order_status));
    }
  };

  if (isOrderDetailsLoading) {
    return (
      <>
        <Box
          sx={{
            py: "0.75rem",
          }}
        >
          <Skeleton variant="text" height={20} width={200} />
        </Box>

        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          spacing={2}
          mt={2}
        >
          <Skeleton variant="text" level="h2" width={180} />

          <Stack spacing={1} direction="row" alignItems="center">
            <FormControl
              size="sm"
              sx={{
                width: 195,
              }}
            >
              <Select
                disabled
                placeholder="Change order status"
                slotProps={{
                  button: {
                    id: "select-field-demo-button",
                    sx: {
                      textTransform: "capitalize",
                      fontWeight: 600,
                    },
                  },
                }}
                color="neutral"
              ></Select>
            </FormControl>
            <Button
              disabled
              size="sm"
              startDecorator={<Download />}
              color="neutral"
              variant="outlined"
            >
              Download Invoice
            </Button>

            <IconButton variant="plain" disabled>
              <MoreHoriz />
            </IconButton>
          </Stack>
        </Stack>
      </>
    );
  }

  if (!orderDetails) {
    return "Failed to load the header...";
  }

  return (
    <>
      <CustomBreadcrumb items={breadcrumbItems} />

      <Stack
        justifyContent="space-between"
        direction="row"
        alignItems="center"
        spacing={2}
        mt={2}
      >
        <Typography component="h1" level="h2">
          {orderDetails?.invoice_id}
        </Typography>

        <Stack spacing={1} direction="row" alignItems="center">
          <FormControl
            size="sm"
            sx={{
              width: 195,
            }}
          >
            <Select
              placeholder="Change order status"
              slotProps={{
                button: {
                  id: "select-field-demo-button",
                  sx: {
                    textTransform: "capitalize",
                    fontWeight: 600,
                    color: theme.palette.neutral[700],
                  },
                },
              }}
              value={orderStatus}
              color="neutral"
              onChange={(_, value) => value && handleStatusChange(value)}
            >
              {ORDER_STATUS.map((order) => (
                <Option
                  key={order}
                  value={order}
                  sx={{
                    textTransform: "capitalize",
                  }}
                >
                  {snakeCaseToNormalText(order)}
                </Option>
              ))}
            </Select>
          </FormControl>
          <Button
            size="sm"
            startDecorator={<Download />}
            color="neutral"
            variant="outlined"
          >
            Download Invoice
          </Button>

          <IconButton variant="plain">
            <MoreHoriz />
          </IconButton>
        </Stack>
      </Stack>
    </>
  );
}
