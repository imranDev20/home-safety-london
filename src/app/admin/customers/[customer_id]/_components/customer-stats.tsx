import { Card, CardContent, Divider, Grid, Stack, Typography } from "@mui/joy";
import React from "react";

const CustomerStats = () => {
  return (
    <Grid spacing={2} my={3} container columns={31}>
      <Grid xs={12} md={7}>
        <Typography level="title-md" mb={1}>
          Total Spent
        </Typography>
        <Typography level="h2">$10440.2k</Typography>
        <Typography level="body-sm" color="neutral">
          New cost last 365 days
        </Typography>
      </Grid>
      <Grid
        xs={12}
        md={1}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Divider orientation="vertical" />
      </Grid>

      <Grid xs={12} md={7}>
        <Typography level="title-md" mb={1}>
          Total Orders
        </Typography>
        <Typography level="h2">127</Typography>
        <Typography level="body-sm" color="neutral">
          New cost last 365 days
        </Typography>
      </Grid>

      <Grid
        xs={12}
        md={1}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Divider
          orientation="vertical"
          sx={{
            height: "100%",
          }}
        />
      </Grid>

      <Grid xs={12} md={7}>
        <Typography level="title-md" mb={1}>
          Completed
        </Typography>
        <Typography level="h2">100</Typography>
        <Typography level="body-sm" color="neutral">
          New cost last 365 days
        </Typography>
      </Grid>

      <Grid
        xs={12}
        md={1}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Divider orientation="vertical" />
      </Grid>

      <Grid xs={12} md={7}>
        <Typography level="title-md" mb={1}>
          Cancelled
        </Typography>
        <Typography level="h2">12</Typography>
        <Typography level="body-sm" color="neutral">
          New cost last 365 days
        </Typography>
      </Grid>
    </Grid>
  );
};

export default CustomerStats;
