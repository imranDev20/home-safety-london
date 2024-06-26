"use client";
import { Add, Download, Home, KeyboardArrowRight } from "@mui/icons-material";
import {
  Breadcrumbs,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Link as JoyLink,
  Option,
  Select,
  Stack,
  Typography,
  useTheme,
} from "@mui/joy";
import Link from "next/link";
import { ORDER_STATUS } from "@/shared/constants";
import { snakeCaseToNormalText, toSnakeCase } from "@/shared/functions";
import OrderTable from "./_components/order-table";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Assignee from "./_components/assignee";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQueryString } from "@/app/_components/hooks/use-query-string";
import DebounceInput from "@/app/_components/common/debounce-input";
import { exportOrders } from "@/services/orders.services";
import dayjs from "dayjs";

export default function Orders() {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const orderStatus = searchParams.get("order_status") || "";
  const { createQueryString, removeQueryString } = useQueryString();

  const [openCreateCustomerDrawer, setOpenCreateCustomerDrawer] =
    useState<boolean>(false);

  const { isLoading: isExportOrdersLoading, refetch: refetchExportOrders } =
    useQuery({
      queryKey: ["export-orders"],
      queryFn: async () => await exportOrders(),
      enabled: false,
    });

  const handleExportOrders = async () => {
    try {
      const response = await refetchExportOrders();
      const data = response.data;

      if (response.status === "success") {
        // const progressUpdates = data.progressUpdates;
        const excelData = data.excelData;

        // Download Excel file
        const byteArray = new Uint8Array(
          atob(excelData)
            .split("")
            .map((char) => char.charCodeAt(0))
        );
        const blob = new Blob([byteArray], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const downloadUrl = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = downloadUrl;
        link.setAttribute(
          "download",
          `Orders - ${dayjs().format("YYYY-MM-DD@hh:mm:ss")}.xlsx`
        );
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        console.log(data);
        console.error("Error exporting orders:", data);
      }
    } catch (err) {
      console.error(err);
    }
    // finally {
    //   setIsDownloading(false);
    //   setProgress(null);
    // }
  };

  const handleDebounce = (value: string): void => {
    if (value !== "") {
      router.push(`${pathname}?${createQueryString("q", value)}`);
    } else {
      router.push(`${pathname}?${removeQueryString("q")}`);
    }
  };

  return (
    <>
      <Breadcrumbs
        sx={{
          px: 0,
          fontSize: 13,
        }}
        separator={
          <KeyboardArrowRight
            fontSize="inherit"
            sx={{
              fontSize: 20,
            }}
          />
        }
      >
        <JoyLink
          component={Link}
          color="neutral"
          href="/admin/"
          sx={{
            color: theme.palette.text.primary,
            textDecoration: "none",
          }}
        >
          <Home />
        </JoyLink>
        <Typography
          color="primary"
          sx={{
            fontWeight: 500,
          }}
        >
          Orders
        </Typography>
      </Breadcrumbs>
      <Stack
        spacing={2}
        mt={2}
        justifyContent="space-between"
        alignItems={{
          xs: "flex-start",
          md: "center",
        }}
        direction={{
          xs: "column",
          sm: "row",
        }}
      >
        <Typography component="h1" level="h2">
          Order List
        </Typography>

        <Stack
          spacing={2}
          direction={{
            xs: "column",
            sm: "row",
          }}
        >
          <Button
            size="sm"
            variant="outlined"
            startDecorator={<Download />}
            onClick={handleExportOrders}
            loading={isExportOrdersLoading}
            loadingPosition="start"
          >
            Download Excel
          </Button>
          <Button
            size="sm"
            startDecorator={<Add />}
            onClick={() => setOpenCreateCustomerDrawer(true)}
          >
            Add New Order
          </Button>
        </Stack>
      </Stack>

      <Grid container spacing={1} sx={{ mt: 3, mb: 2 }}>
        <Grid xs={12} md={4}>
          <FormControl size="sm">
            <FormLabel
              id="select-field-demo-label"
              htmlFor="select-field-demo-button"
            >
              Search for orders
            </FormLabel>
            <DebounceInput
              placeholder="Type in invoice ID, Email, Name or Phone No..."
              debounceTimeout={1000}
              handleDebounce={handleDebounce}
            />
          </FormControl>
        </Grid>

        <Grid xs={12} md={2}>
          <FormControl size="sm">
            <FormLabel
              id="select-field-demo-label"
              htmlFor="select-field-demo-button"
            >
              Status
            </FormLabel>
            <Select
              placeholder="Filter by status"
              slotProps={{
                button: {
                  id: "select-field-demo-button",
                  sx: {
                    textTransform: "capitalize",
                  },
                },
              }}
              value={orderStatus || ""}
              onChange={(_, value) =>
                router.push(
                  `${pathname}?${createQueryString(
                    "order_status",
                    value as string
                  )}`,
                  { scroll: false }
                )
              }
            >
              <Option
                value=""
                sx={{
                  textTransform: "capitalize",
                }}
              >
                All Statuses
              </Option>
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
        </Grid>

        <Grid xs={12} md={2}>
          <Assignee />
        </Grid>

        <Grid xs={12} md={2}>
          <FormControl size="sm">
            <FormLabel
              id="select-field-demo-label"
              htmlFor="select-field-demo-button"
            >
              Sort
            </FormLabel>
            <Select
              placeholder="Sort orders by..."
              slotProps={{
                button: {
                  id: "select-field-demo-button",
                },
              }}
              defaultValue="createdAt"
              onChange={(e, value) =>
                router.push(
                  `${pathname}?${createQueryString(
                    "sort_by",
                    value as string
                  )}`,
                  { scroll: false }
                )
              }
            >
              <Option value="createdAt">Date Created</Option>

              {["Customer Name", "Email", "Phone"].map((sortVal) => (
                <Option value={toSnakeCase(sortVal)} key={sortVal}>
                  {sortVal}
                </Option>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid xs={12} md={2}>
          <FormControl size="sm">
            <FormLabel
              id="select-field-demo-label"
              htmlFor="select-field-demo-button"
            >
              Order
            </FormLabel>
            <Select
              placeholder="Order customers by..."
              slotProps={{
                button: {
                  id: "select-field-demo-button",
                },
              }}
              defaultValue="desc"
              onChange={(e, value) =>
                router.push(
                  `${pathname}?${createQueryString(
                    "sort_order",
                    value as string
                  )}`,
                  { scroll: false }
                )
              }
            >
              <Option value="asc">Ascending</Option>
              <Option value="desc">Descending</Option>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <OrderTable />
    </>
  );
}
