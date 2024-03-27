"use client";
import React from "react";
import { Box, Card, Container, Grid, Sheet, Typography } from "@mui/joy";
import { EngineersIcon } from "@/app/_components/common/icons";

const ADVANTAGES = [
  {
    id: 1,
    advantageName: "Our Qualified Engineers",
    advantageDetail: "Over 30 Years Experience",
    Icon: EngineersIcon,
  },
  {
    id: 2,
    advantageName: "Low Price Promise",
    advantageDetail: "We won't be beaten on price.",
    Icon: EngineersIcon,
  },
  {
    id: 3,
    advantageName: "Fast Response",
    advantageDetail: "Arrange an appointment, as early as tomorrow",
    Icon: EngineersIcon,
  },
  {
    id: 4,
    advantageName: "Book Any Time",
    advantageDetail: "Book at a time that works for you",
    Icon: EngineersIcon,
  },
];

export default function Advantage() {
  return (
    <Sheet
      variant="soft"
      sx={{
        py: 10,
        my: 5,
      }}
    >
      <Container component="section">
        <Box
          sx={{
            textAlign: "center",
            mb: 3,
          }}
        >
          <Typography component="h2" level="h2" sx={{ mb: 2 }}>
            Reasons You Should Call Us
          </Typography>
          <Typography color="neutral">
            Electrician is your single source for a complete range of high
            quality eletrical <br /> services, including design/build,
            engineering and maintenance
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {ADVANTAGES.map((advan) => (
            <Grid xs={3} key={advan.id}>
              <Card
                variant="plain"
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <advan.Icon
                  color="primary"
                  sx={{
                    fontSize: 50,
                  }}
                />
                <Typography
                  component="h3"
                  level="h4"
                  sx={{
                    textAlign: "center",
                  }}
                >
                  {advan.advantageName}
                </Typography>
                <Typography
                  color="neutral"
                  sx={{
                    textAlign: "center",
                  }}
                >
                  {advan.advantageDetail}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Sheet>
  );
}
