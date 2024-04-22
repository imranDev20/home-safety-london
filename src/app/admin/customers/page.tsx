"use client";
import { Home, KeyboardArrowRight } from "@mui/icons-material";
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
import { CATEGORIES, ORDER_STATUS } from "@/shared/constants";
import { snakeCaseToNormalText } from "@/shared/functions";
import CustomersTable from "./_components/customers-table";

function Customers() {
  const theme = useTheme();

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

      <Stack justifyContent="space-between" direction="row" alignItems="center">
        <Typography component="h1" level="h2">
          Customers List
        </Typography>
        <Button size="sm" startDecorator={<AddIcon />}>
          Add New Customer
        </Button>
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
              placeholder="Search for customer, email, phone, status...."
              startDecorator={<SearchIcon />}
            />
          </FormControl>
        </Grid>

        <Grid xs={12} sm={6} md={2}>
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

        <Grid xs={12} sm={6} md={2}>
          <FormControl size="sm">
            <FormLabel
              id="select-field-demo-label"
              htmlFor="select-field-demo-button"
            >
              Categories
            </FormLabel>
            <Select
              slotProps={{
                button: {
                  id: "select-field-demo-button",
                },
              }}
              placeholder="Filter by category"
            >
              {CATEGORIES.map((category) => (
                <Option key={category.name} value={category.name}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid xs={12} sm={6} md={2}>
          <FormControl size="sm">
            <FormLabel
              id="select-field-demo-label"
              htmlFor="select-field-demo-button"
            >
              Assignee
            </FormLabel>
            <Select
              placeholder="Filter by assignee"
              slotProps={{
                button: {
                  id: "select-field-demo-button",
                },
              }}
            >
              <Option value="dog">Dog</Option>
              <Option value="cat">Cat</Option>
              <Option value="fish">Fish</Option>
              <Option value="bird">Bird</Option>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* import customers table */}
      <CustomersTable />
    </>
  );
}

export default Customers;
