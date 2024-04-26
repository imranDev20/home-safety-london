import React from "react";
import map from "../../../images/map.png";
import { Box, Container, Grid, Typography } from "@mui/joy";
import Image from "next/image";

export default function LondonMap() {
  return (
    <Container
      sx={{
        my: 15,
      }}
    >
      <Grid container spacing={3}>
        <Grid xs={12} md={6} sx={{ order: { xs: 2, md: 1 } }}>
          <Box>
            <Typography
              component="h2"
              level="h2"
              sx={{
                mb: 2,
              }}
            >
              Greator London Coverage
            </Typography>
            <Typography
              color="neutral"
              sx={{
                mb: 3,
              }}
            >
              London Property Inspections have 15 years experience in providing
              the property compliance certificates to:
            </Typography>

            <Typography color="neutral">
              We provide services to residential and commercial properties which
              includes EICR, Fire Safety Certificate, Fire Risk Assessment, PAT
              Testing, Emergency Lighting Certificate, Gas Safety Certificate,
              EPC and any kind of plumbing work, gas repairs, electrical repairs
              from rewiring the buildings to houses in London and M25 area.
            </Typography>
          </Box>
        </Grid>

        <Grid
          xs={12}
          md={6}
          sx={{ order: { xs: 1, md: 2 }, mb: { xs: 5, md: 0 } }}
        >
          <Box
            sx={{
              width: "100%",
              position: "relative",
              height: "100%",
              borderRadius: 5,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                "@media (min-width: 900px)": {
                  position: "absolute",
                },
              }}
            >
              <Image
                src={map}
                alt="map-image"
                layout="intrinsic"
                width={500}
                objectFit="cover"
                style={{
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
