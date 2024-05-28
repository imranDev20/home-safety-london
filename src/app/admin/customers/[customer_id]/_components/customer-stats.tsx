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
    <Grid xs={3} md={3}>
      <Card>
        <Typography level="title-md">{title}</Typography>
        <Typography level="h3" color="primary">
          {count}
        </Typography>
        <Typography level="body-sm" color="neutral">
          {additional}
        </Typography>
      </Card>
    </Grid>
  );
}

export default function CustomerStats() {
  return (
    <Grid spacing={2} my={3} container>
      <CustomerStatBlock
        title="Total Spent"
        count={10440.2}
        additional="New cost last 365 days"
      />

      <CustomerStatBlock
        title="Total Orders"
        count={127}
        additional="New cost last 365 days"
      />

      <CustomerStatBlock
        title="Completed"
        count={100}
        additional="New cost last 365 days"
      />

      <CustomerStatBlock
        title="Cancelled"
        count={12}
        additional="New cost last 365 days"
      />
    </Grid>
  );
}
