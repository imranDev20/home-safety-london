"use client";
import React from "react";
import { Box, Button, Container, Divider, Grid, Stack } from "@mui/joy";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { CorporateFare, Home, Textsms } from "@mui/icons-material";
import { SERVICES } from "@/shared/constants";

export default function Hero() {
  return (
    <Container sx={{ my: 15 }}>
      <Grid container spacing={5}>
        <Grid xs={8}>
          <Box>
            <Grid container spacing={3}>
              {SERVICES.map((service) => (
                <Grid xs={3} key={service.id}>
                  <Card
                    variant="outlined"
                    sx={{ height: "100%", textAlign: "center" }}
                  >
                    <Typography level="title-lg">
                      {service.serviceName}
                    </Typography>
                    <Typography level="body-xs">
                      {service.serviceDetail}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
        <Grid xs={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography
                level="h2"
                sx={{
                  textAlign: "center",
                }}
              >
                Book Now
              </Typography>

              <Divider
                sx={{
                  my: 2,
                }}
              />
              <Typography
                sx={{
                  textAlign: "center",
                }}
              >
                Select Your Property as appropriate and get quote in 30 seconds!
              </Typography>

              <Stack
                spacing={2}
                sx={{
                  mt: 3,
                }}
              >
                <Button
                  startDecorator={<Home />}
                  variant="outlined"
                  color="primary"
                  size="lg"
                >
                  Residential Property
                </Button>
                <Button
                  startDecorator={<CorporateFare />}
                  variant="outlined"
                  color="primary"
                  size="lg"
                >
                  Commercial Property
                </Button>

                <Button startDecorator={<Textsms />} size="lg">
                  Request a Quote
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
