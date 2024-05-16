"use client";
import {
  Close,
  Download,
  DownloadDone,
  Home,
  KeyboardArrowRight,
  PlaylistAddCheckCircleRounded,
} from "@mui/icons-material";
import {
  Box,
  Breadcrumbs,
  Button,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  Input,
  Link as JoyLink,
  LinearProgress,
  Snackbar,
  Stack,
  Typography,
  useTheme,
} from "@mui/joy";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import CustomersTable from "./_components/customers-table";
import { useState } from "react";
import FormDrawer from "@/app/_components/common/form-drawer";
import CreateCustomerForm from "./_components/create-customer-form";
import { useQuery } from "@tanstack/react-query";
import { exportUsers } from "@/services/user.services";

function Customers() {
  const theme = useTheme();
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

  // Export is set to track progress and show loading bar
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
        link.setAttribute("download", "users.xlsx");
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

  return (
    <>
      <Breadcrumbs
        sx={{
          px: 0,
          fontSize: 13,
        }}
        separator={<KeyboardArrowRight fontSize="md" />}
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
        justifyContent="space-between"
        alignItems={{
          xs: "flex-start",
          md: "center",
        }}
        direction={{
          xs: "column",
          md: "row",
        }}
      >
        <Typography component="h1" level="h2">
          Customers List
        </Typography>

        <Stack
          spacing={2}
          direction={{
            xs: "column",
            md: "row",
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
            Download Excel sheet
          </Button>
          <Button
            size="sm"
            startDecorator={<AddIcon />}
            onClick={() => setOpenCreateCustomerDrawer(true)}
          >
            Add New Customer
          </Button>
        </Stack>
      </Stack>

      <Grid container spacing={1} sx={{ mt: 3, mb: 2 }}>
        <Grid xs={12} sm={6} md={6}>
          <FormControl size="sm">
            <FormLabel
              id="select-field-demo-label"
              htmlFor="select-field-demo-button"
            >
              Search for customers
            </FormLabel>
            <Input
              placeholder="Search for customers with name, email or phone..."
              startDecorator={<SearchIcon />}
            />
          </FormControl>
        </Grid>
      </Grid>

      <CustomersTable />

      <FormDrawer
        open={openCreateCustomerDrawer}
        setOpen={setOpenCreateCustomerDrawer}
      >
        <CreateCustomerForm />
      </FormDrawer>
    </>
  );
}

export default Customers;
