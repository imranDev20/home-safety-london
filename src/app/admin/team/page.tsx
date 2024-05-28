"use client";
import { Download, Home, KeyboardArrowRight } from "@mui/icons-material";
import {
  Box,
  Breadcrumbs,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Link as JoyLink,
  Stack,
  Typography,
  useTheme,
} from "@mui/joy";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import Teams from "./_components/teams";
import SearchField from "../customers/_components/search-field";

const Team = () => {
  const theme = useTheme();

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
          href="/admin/team"
          sx={{
            textDecoration: "none",
          }}
        >
          Team
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
          Employee List
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
            loadingPosition="start"
          >
            Download Excel
          </Button>
          <Button size="sm" startDecorator={<AddIcon />}>
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
            <SearchField />
          </FormControl>
        </Grid>
      </Grid>

      {/* import team page component */}
      <Teams />
    </>
  );
};

export default Team;
