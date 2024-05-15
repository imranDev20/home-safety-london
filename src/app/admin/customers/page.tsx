"use client";
import { Download, Home, KeyboardArrowRight } from "@mui/icons-material";
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
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import CustomersTable from "./_components/customers-table";
import { useState } from "react";
import FormDrawer from "@/app/_components/common/form-drawer";
import CreateCustomerForm from "./_components/create-customer-form";

function Customers() {
  const theme = useTheme();
  const [openCreateCustomerDrawer, setOpenCreateCustomerDrawer] =
    useState<boolean>(false);

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
          <Button size="sm" variant="outlined" startDecorator={<Download />}>
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

      {/* <CustomersTable /> */}

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
