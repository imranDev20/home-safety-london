import React from "react";
import { Box, Card, Container, Grid, Typography } from "@mui/joy";
import { CorporateFare, Home, Textsms } from "@mui/icons-material";
import { EicrIcon } from "@/app/_components/common/icons";
import Image from "next/image";
import BackgroundImage from "@/images/hero-image.jpeg";
import { usePathname } from "next/navigation";
import serviceData from "@/assets/services-data.json";
import BookNow from "@/app/_components/common/book-now";

export default function ServiceHero() {
  const pathname = usePathname();

  const service = serviceData.find((service) =>
    pathname.includes(service.route)
  );

  return (
    <>
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
            pt: 5,
            pb: 5,
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
          <Container sx={{ my: 10, position: "relative" }}>
            <Grid container spacing={5}>
              <Grid xs={8} sx={{ my: "auto" }}>
                <Box>
                  <Grid container spacing={4}>
                    <Grid xs={4}>
                      <Card
                        variant="outlined"
                        sx={{ height: "100%", textAlign: "center" }}
                      >
                        <EicrIcon
                          sx={{ mx: "auto", fontSize: 50 }}
                          color="primary"
                        />
                        <Typography component="h2" level="h1">
                          EICR
                        </Typography>
                        <Typography level="body-sm">
                          Electrial Certificate
                        </Typography>
                      </Card>
                    </Grid>
                    <Grid xs={8}>
                      <Box>
                        <Typography
                          level="h2"
                          component="h1"
                          sx={{
                            mb: 3,
                            color: "white",
                          }}
                        >
                          EICR Certificate
                        </Typography>
                        <Typography
                          sx={{
                            color: "whitesmoke",
                          }}
                        >
                          An electrical installation condition report previously
                          known as (periodic electrical inspection) is an
                          inspection on the condition of an existing electrical
                          installation, to identify if any part of the
                          installation does not meet current British standards.
                        </Typography>
                      </Box>
                    </Grid>
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
    </>
  );
}
