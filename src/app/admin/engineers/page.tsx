"use client";
import { Download, Home, KeyboardArrowRight } from "@mui/icons-material";
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
import AddIcon from "@mui/icons-material/Add";
import EngineerCards from "./_components/engineer-cards";
import FormDrawer from "@/app/_components/common/form-drawer";
import { useState } from "react";
import CreateEngineerForm from "./_components/create-engineer-form";
import DebounceInput from "../../_components/common/debounce-input";
import { usePathname, useRouter } from "next/navigation";
import { toSnakeCase } from "@/shared/functions";
import { useQueryString } from "@/app/_components/hooks/use-query-string";

export default function EngineersPage() {
  const theme = useTheme();
  const [openCreateEngineerDrawer, setOpenCreateEngineerDrawer] =
    useState<boolean>(false);
  const { createQueryString, removeQueryString } = useQueryString();

  const router = useRouter();
  const pathname = usePathname();

  const handleDebounce = (value: string) => {
    if (value !== "") {
      router.push(`${pathname}?${createQueryString("q", value)}`);
    } else {
      router.push(`${pathname}?${removeQueryString("q")}}`);
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
            textDecoration: "none",
          }}
        >
          Engineers
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
          Engineer List
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
          <Button
            size="sm"
            startDecorator={<AddIcon />}
            onClick={() => setOpenCreateEngineerDrawer(true)}
          >
            Add New Engineer
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
              placeholder="Type in here…"
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
              Filter
            </FormLabel>
            <Select
              placeholder="Filter by specialty"
              slotProps={{
                button: {
                  id: "select-field-demo-button",
                  sx: {
                    textTransform: "capitalize",
                  },
                },
              }}
            >
              {["Electrician", "Fire Safety Expert"].map((specialty) => (
                <Option
                  key={specialty}
                  value={specialty}
                  sx={{
                    textTransform: "capitalize",
                  }}
                >
                  {specialty}
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
              Sort
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
              {[
                "Name",
                "Specialty",
                "Ongoing Projects",
                "Completed Projects",
                "Email",
                "Phone",
              ].map((sortValue) => (
                <Option
                  key={sortValue}
                  value={toSnakeCase(sortValue)}
                  sx={{
                    textTransform: "capitalize",
                  }}
                >
                  {sortValue}
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
              defaultValue="desc"
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
              <Option
                value="asc"
                sx={{
                  textTransform: "capitalize",
                }}
              >
                Ascending
              </Option>
              <Option
                value="desc"
                sx={{
                  textTransform: "capitalize",
                }}
              >
                Descending
              </Option>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <EngineerCards />

      <FormDrawer
        open={openCreateEngineerDrawer}
        setOpen={setOpenCreateEngineerDrawer}
      >
        <CreateEngineerForm
          setOpenCreateEngineerDrawer={setOpenCreateEngineerDrawer}
        />
      </FormDrawer>
    </>
  );
}
