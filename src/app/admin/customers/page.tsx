"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useState } from "react";

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

import CustomersTable from "./_components/customers-table";
import FormDrawer from "@/app/_components/common/form-drawer";
import CreateCustomerForm from "./_components/create-customer-form";
import DebounceInput from "../../_components/common/debounce-input";

import { exportUsers } from "@/services/user.services";

import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import { toSnakeCase } from "@/shared/functions";
import { useQueryString } from "@/app/_components/hooks/use-query-string";

export default function Customers() {
  const theme = useTheme();
  const [openCreateCustomerDrawer, setOpenCreateCustomerDrawer] =
    useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const { createQueryString, removeQueryString } = useQueryString();

  // Mutate function to export users
  const { isPending: isExportUsersPending, refetch: refetchExportUsers } =
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

        // Update progress
        // for (const { progress } of progressUpdates) {
        //   setProgress(progress);
        // }

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
          `Customers - ${dayjs().format("YYYY-MM-DD@hh:mm:ss")}.xlsx`
        );
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
        <JoyLink
          component={Link}
          color="neutral"
          href="/admin/customers"
          sx={{
            textDecoration: "none",
          }}
        >
          Customers
        </JoyLink>
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
          Customer List
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
            loading={isExportUsersPending}
            loadingPosition="start"
          >
            Download Excel
          </Button>
          <Button
            size="sm"
            startDecorator={<Add />}
            onClick={() => setOpenCreateCustomerDrawer(true)}
          >
            Add New Customer
          </Button>
        </Stack>
      </Stack>

      <Grid container spacing={1} sx={{ mt: 3, mb: 2 }}>
        <Grid xs={12} md={6}>
          <FormControl size="sm">
            <FormLabel
              id="select-field-demo-label"
              htmlFor="select-field-demo-button"
            >
              Search for customers
            </FormLabel>
            <DebounceInput
              placeholder="Type in customer email, name or phone number..."
              debounceTimeout={1000}
              handleDebounce={handleDebounce}
            />
          </FormControl>
        </Grid>
        <Grid xs={12} md={3}>
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
        <Grid xs={12} md={3}>
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
      <CustomersTable />

      <FormDrawer
        state={openCreateCustomerDrawer}
        setOpen={setOpenCreateCustomerDrawer}
      >
        <CreateCustomerForm
          setOpenCreateCustomerDrawer={setOpenCreateCustomerDrawer}
        />
      </FormDrawer>
    </>
  );
}
