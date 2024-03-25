"use client";
import React from "react";
import { Box, Button, Container, Grid, Stack } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import { Phone } from "@mui/icons-material";
import Image from "next/image";
import BackgroundImage from "@/images/hero-image.jpeg";
import { theme } from "@/shared/theme";
import BookNow from "@/app/_components/common/book-now";

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
        fill
        loading="lazy"
        placeholder="blur"
        style={{ objectFit: "cover" }}
      />

      <Box
        sx={{
          height: "100%",
          position: "relative",
          pt: 20,
          pb: 20,
          "&::before": {
            content: '""',
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            backgroundColor: "rgba(17, 38, 49, .9)",
          },
        }}
      >
        <Container>
          <Grid container spacing={5}>
            <Grid xs={8}>
              <Box sx={{ position: "relative" }}>
                <Grid container spacing={3}>
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 800,
                        fontSize: 50,
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
                        color: "#d9d9d9",
                        fontSize: 20,
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
                      }}
                    >
                      <Button
                        size="lg"
                        startDecorator={<Phone />}
                        variant="solid"
                      >
                        Services
                      </Button>
                      <Button
                        size="lg"
                        startDecorator={<Phone />}
                        variant="plain"
                        color="secondary"
                        sx={{
                          mt: 5,
                          ":hover": {
                            backgroundColor:
                              theme.colorSchemes.light.palette.secondary[100],
                          },
                        }}
                      >
                        075-7916-4993
                      </Button>
                    </Stack>
                  </Box>
                </Grid>
              </Box>
            </Grid>
            <Grid xs={4}>
              <BookNow />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
