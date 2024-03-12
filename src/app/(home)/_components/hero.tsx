"use client";
import React from "react";
import { Box, Button, Container, Divider, Grid, Stack } from "@mui/joy";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { CorporateFare, Home, Textsms } from "@mui/icons-material";
import { SERVICES } from "@/shared/constants";
import Image from "next/image";
import BackgroundImage from "@/images/london-view.jpg";
import { theme } from "@/shared/theme";
import Link from "next/link";

export default function Hero() {
  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <Image
        src={BackgroundImage}
        alt="Background"
        sizes="100vw"
        fill
        loading="lazy"
        placeholder="blur"
        style={{ objectFit: "cover" }}
      />

      <Box
        sx={{
          height: "100%",
          position: "relative",
          pt: 10,
          pb: 10,
          "&::before": {
            content: '""',
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            backgroundColor: "black",
            opacity: 0.6,
          },
        }}
      >
        <Container>
          <Grid container spacing={5}>
            <Grid xs={8}>
              <Box sx={{ position: "relative" }}>
                <Grid container spacing={3}>
                  {SERVICES.map((service) => (
                    <Grid xs={3} key={service.id}>
                      <Card
                        variant="outlined"
                        sx={{ height: "100%", textAlign: "center" }}
                      >
                        <service.Icon
                          sx={{
                            fontSize: 45,
                            mx: "auto",
                            color:
                              theme.colorSchemes.light.palette.primary[600],
                          }}
                        />
                        <Typography level="h3">
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
                    Select Your Property as appropriate and get quote in 30
                    seconds!
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
                      component={Link}
                      href="/quote?property_type=residential"
                    >
                      Residential Property
                    </Button>
                    <Button
                      startDecorator={<CorporateFare />}
                      variant="outlined"
                      color="primary"
                      size="lg"
                      component={Link}
                      href="/quote?property_type=commercial"
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
      </Box>
    </Box>
  );
}
