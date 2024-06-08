"use client";
import React from "react";
import Assignee from "../../_components/assignee";
import { Autocomplete, Box, Button, Grid } from "@mui/joy";
import { AddRounded, Mail } from "@mui/icons-material";
import useOrderDetails from "@/app/_components/hooks/use-order-details";
import ScheduleInfo from "./schedule-info";

export default function AssignedAndTimeInfo() {
  const { orderDetails } = useOrderDetails();

  if (!orderDetails) {
    return "Loading...";
  }

  return (
    <>
      <Grid container spacing={3} mt={1}>
        <Grid md={9}>
          <Box
            sx={{
              width: "100%",
            }}
          >
            <Grid container spacing={3} mt={3}>
              <Grid md={4}>
                <Assignee
                  isOrderItems
                  onChange={(newVal) => console.log(newVal)}
                />
              </Grid>

              <Grid md={5}>
                <Autocomplete
                  size="sm"
                  multiple
                  id="tags-default"
                  placeholder="Leave empty to select all services"
                  options={orderDetails?.order_items}
                  getOptionLabel={(option) => option.name as string}
                />
              </Grid>

              <Grid md={3}>
                <Button
                  variant="outlined"
                  size="sm"
                  color="neutral"
                  startDecorator={<Mail />}
                  fullWidth
                >
                  Send Email
                </Button>
              </Grid>
            </Grid>

            <Grid container spacing={3} mt={1}>
              <Grid md={4}>
                <Button
                  variant="outlined"
                  size="sm"
                  color="neutral"
                  startDecorator={<AddRounded />}
                >
                  Add Another
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid md={3}>
          <ScheduleInfo />
        </Grid>
      </Grid>
    </>
  );
}

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
  {
    label: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
];
