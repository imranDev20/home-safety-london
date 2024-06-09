"use client";
import CustomBreadcrumb from "@/app/_components/common/custom-breadcrumb";
import useOrderDetails from "@/app/_components/hooks/use-order-details";
import useUpdateOrderDetails from "@/app/_components/hooks/use-update-order-details";
import {
  ORDER_STATUS,
  ORDER_STATUS_COLORS,
  ORDER_STATUS_ICONS,
} from "@/shared/constants";
import { getMostRecentStatus, snakeCaseToNormalText } from "@/shared/functions";
import { OrderStatusValues } from "@/types/orders";
import {
  Block,
  DeleteForever,
  Download,
  Edit,
  MoreHoriz,
  MoreVertRounded,
  West,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Dropdown,
  FormControl,
  IconButton,
  Link as JoyLink,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
  Option,
  Select,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/joy";
import dayjs from "dayjs";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function OrderDetailsHeader() {
  const { orderDetails, isPending: isOrderDetailsPending } = useOrderDetails();
  const { updateOrderMutate } = useUpdateOrderDetails();
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

  if (isOrderDetailsPending) {
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
        <Stack>
          <Stack direction="row" spacing={2}>
            <IconButton
              variant="plain"
              size="sm"
              component={Link}
              href={`/admin/orders`}
            >
              <West />
            </IconButton>
            <Typography component="h1" level="h2">
              {orderDetails?.invoice_id || "Loading..."}
            </Typography>
          </Stack>

          <Typography level="body-sm" ml={6} mt={0.5}>
            {dayjs(orderDetails.createdAt).format("DD MMMM YYYY, hh:MM")}
          </Typography>
        </Stack>

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
              startDecorator={ORDER_STATUS_ICONS[orderStatus]}
              value={orderStatus}
              sx={{
                ".MuiSelect-startDecorator": {
                  ".MuiSvgIcon-root": {
                    color: ORDER_STATUS_COLORS[orderStatus],
                  },
                },
              }}
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

          <Dropdown>
            <MenuButton
              slots={{ root: IconButton }}
              slotProps={{
                root: { variant: "plain", color: "neutral", size: "sm" },
              }}
            >
              <MoreVertRounded />
            </MenuButton>
            <Menu size="sm" sx={{ minWidth: 140 }} placement="bottom-end">
              <MenuItem color="danger">
                <ListItemDecorator>
                  <Block />
                </ListItemDecorator>{" "}
                Deactivate
              </MenuItem>
              <MenuItem color="danger">
                <ListItemDecorator>
                  <DeleteForever />
                </ListItemDecorator>{" "}
                Delete
              </MenuItem>
            </Menu>
          </Dropdown>
        </Stack>
      </Stack>
    </>
  );
}
