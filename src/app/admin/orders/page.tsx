"use client";
import { Add, Download, Home, KeyboardArrowRight } from "@mui/icons-material";
import {
  Breadcrumbs,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Link as JoyLink,
  Option,
  Select,
  Stack,
  Typography,
  useTheme,
} from "@mui/joy";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import { CATEGORIES, ORDER_STATUS } from "@/shared/constants";
import { snakeCaseToNormalText, toSnakeCase } from "@/shared/functions";
import OrderTable from "./_components/order-table";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { exportUsers } from "@/services/user.services";
import Assignee from "./_components/assignee";
import { usePathname, useRouter } from "next/navigation";
import { useCreateQueryString } from "@/app/_components/hooks/use-create-query-string";
import DebounceInput from "@/app/_components/common/debounce-input";

const Orders = () => {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const createQueryString = useCreateQueryString();

  const [openCreateCustomerDrawer, setOpenCreateCustomerDrawer] =
    useState<boolean>(false);

  const { isLoading: isExportUsersLoading, refetch: refetchExportUsers } =
    useQuery({
      queryKey: ["export-users"],
      queryFn: async () => {
        const response = await exportUsers();
        return response.data;
      },
      enabled: false,
    });

  const handleExportUsers = async () => {
    try {
      const response = await refetchExportUsers();
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
        link.setAttribute("download", "orders.xlsx");
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        console.error("Error exporting users:", data.error);
      }
    } catch (err) {
      console.error(err);
    }
    // finally {
    //   setIsDownloading(false);
    //   setProgress(null);
    // }
  };

  const handleDebounce = (value: string) => {
    if (value !== "") {
      router.push(`${pathname}?${createQueryString("q", value)}`);
    } else {
      router.push(`${pathname}`);
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
            onClick={handleExportUsers}
            loading={isExportUsersLoading}
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
              placeholder="Sort customers by..."
              slotProps={{
                button: {
                  id: "select-field-demo-button",
                },
              }}
              defaultValue="createdAt"
              onChange={(e, value) =>
                router.push(
                  `${pathname}?${createQueryString("sort_by", value as string)}`
                )
              }
            >
              <Option value="createdAt">Date Created</Option>

              {["Name", "Email", "Phone"].map((sortVal) => (
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
                  )}`
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
};

export default Orders;
