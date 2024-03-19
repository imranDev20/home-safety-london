"use client";
import React from "react";
import { Box, Card, Container, Grid, Typography } from "@mui/joy";
import { theme } from "@/shared/theme";

const ADVANTAGES = [
  {
    id: 1,
    advantageName: "Our Qualified Engineers",
    advantageDetail: "Over 30 Years Experience",
  },
  {
    id: 2,
    advantageName: "Low Price Promise",
    advantageDetail: "We won't be beaten on price.",
  },
  {
    id: 3,
    advantageName: "Fast Response",
    advantageDetail: "Arrange an appointment, as early as tomorrow",
  },
  {
    id: 4,
    advantageName: "Book Any Time",
    advantageDetail: "Book at a time that works for you",
  },
];

export default function Advantage() {
  return (
    <Container component="section" sx={{ my: 10 }}>
      <Box
        sx={{
          textAlign: "center",
          mb: 5,
        }}
      >
        <Typography
          component="h4"
          level="h4"
          sx={{ color: theme.colorSchemes.light.palette.secondary[500] }}
        >
          Our Advantages
        </Typography>
        <Typography component="h2" level="h2" sx={{ mb: 2 }}>
          Reasons You Should Call Us
        </Typography>
        <Typography color="neutral">
          Electrician is your single source for a complete range of high quality
          eletrical <br /> services, including design/build, engineering and
          maintenance
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {ADVANTAGES.map((advan) => (
          <Grid xs={3} key={advan.id}>
            <Card variant="soft" sx={{ height: "100%" }}>
              <Typography component="h3" level="h3">
                {advan.advantageName}
              </Typography>
              <Typography color="neutral">{advan.advantageDetail}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
