"use client";
import React from "react";
import Assignee from "../../_components/assignee";
import { Autocomplete, Button, Grid } from "@mui/joy";
import { AddRounded, Mail } from "@mui/icons-material";
import useOrderDetails from "@/app/_components/hooks/use-order-details";

export default function AssignedAndTimeInfo() {
  const { orderDetails } = useOrderDetails();

  if (!orderDetails) {
    return "Loading...";
  }

  return (
    <>
      <Grid container spacing={3} mt={3}>
        <Grid md={2}>
          <Assignee />
        </Grid>

        <Grid md={5}>
          <Autocomplete
            multiple
            id="tags-default"
            placeholder="Favorites"
            options={orderDetails?.order_items}
            getOptionLabel={(option) => option.name as string}
          />
        </Grid>

        <Grid md={2}>
          <Button
            variant="outlined"
            size="sm"
            color="neutral"
            startDecorator={<Mail />}
          >
            Send Email
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={3} mt={1}>
        <Grid md={2}>
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
