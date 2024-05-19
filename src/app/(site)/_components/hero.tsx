"use client";
import React from "react";
import { Box, Button, Container, Grid, Stack, useTheme } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import { Phone } from "@mui/icons-material";
import Image from "next/image";
import BackgroundImage from "@/images/hero-image-new.jpeg";
import BookNow from "@/app/_components/common/book-now";
import { hexToRgba } from "@/shared/functions";

export default function Hero() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: "relative",
        mt: -9.5,
      }}
    >
      <Image
        src={BackgroundImage}
        alt="Background"
        fill
        loading="lazy"
        placeholder="blur"
        style={{ objectFit: "cover" }}
      />

      <Box
        sx={{
          height: "100%",
          position: "relative",
          pt: 25,
          pb: 20,
          "&::before": {
            content: '""',
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            backgroundColor: hexToRgba("#062C64", 0.9),
            mixBlendMode: "multiply",
          },
        }}
      >
        <Container>
          <Grid container spacing={5}>
            <Grid xs={12} sm={12} md={8}>
              <Box sx={{ position: "relative" }}>
                <Grid
                  container
                  spacing={3}
                  sx={{ textAlign: { xs: "center", md: "left" } }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 800,
                        fontSize: { xs: 30, sm: 35, md: 50 },
                        color: "white",
                        mb: 3,
                      }}
                    >
                      Safeguarding London&apos;s{" "}
                      <Typography
                        sx={{
                          color:
                            theme.colorSchemes.light.palette.secondary[600],
                        }}
                        component="span"
                      >
                        Homes
                      </Typography>{" "}
                      with Premier{" "}
                      <Typography
                        sx={{
                          color:
                            theme.colorSchemes.light.palette.secondary[600],
                        }}
                        component="span"
                      >
                        Safety
                      </Typography>{" "}
                      Solutions
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: { xs: 15, sm: 16, md: 20 },
                        color: "white",
                      }}
                    >
                      Welcome to Home Safety London, where we&apos;re dedicated
                      to securing your peace of mind. From EICRs to fire alarms,
                      we&apos;re your one-stop solution for safeguarding every
                      corner of your home.
                    </Typography>

                    <Stack
                      spacing={2}
                      direction="row"
                      sx={{
                        mt: 5,
                        display: { xs: "flex", md: "block" },
                        justifyContent: { xs: "center", md: "start" },
                      }}
                    >
                      <Button
                        size="lg"
                        startDecorator={<Phone />}
                        variant="solid"
                        component="a"
                        color="secondary"
                        href="tel:07480062995"
                      >
                        07480 062995
                      </Button>
                    </Stack>
                  </Box>
                </Grid>
              </Box>
            </Grid>
            <Grid xs={12} sm={12} md={4} sx={{ mt: { xs: 3, md: 0 } }}>
              <BookNow />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
