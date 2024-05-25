import { Card, CardContent, Divider, Grid, Stack, Typography } from "@mui/joy";
import React from "react";

function CustomerStatBlock({
  title,
  count,
  additional,
}: {
  title: string;
  count: number;
  additional: string;
}) {
  return (
    <Grid xs={12} md={7}>
      <Typography level="title-md" mb={1}>
        {title}
      </Typography>
      <Typography level="h3" color="primary">
        {count}
      </Typography>
      <Typography level="body-sm" color="neutral">
        {additional}
      </Typography>
    </Grid>
  );
}

export default function CustomerStats() {
  return (
    <Grid spacing={2} my={3} container columns={31}>
      <CustomerStatBlock
        title="Total Spent"
        count={10440.2}
        additional="New cost last 365 days"
      />

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

      <CustomerStatBlock
        title="Total Orders"
        count={127}
        additional="New cost last 365 days"
      />

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

      <CustomerStatBlock
        title="Completed"
        count={100}
        additional="New cost last 365 days"
      />

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
      <CustomerStatBlock
        title="Cancelled"
        count={12}
        additional="New cost last 365 days"
      />
    </Grid>
  );
}
