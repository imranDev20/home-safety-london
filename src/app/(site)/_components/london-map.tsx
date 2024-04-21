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
        <Grid xs={6}>
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
            Testing, Emergency Lighting Certificate, Gas Safety Certificate, EPC
            and any kind of plumbing work, gas repairs, electrical repairs from
            rewiring the buildings to houses in London and M25 area.
          </Typography>
        </Grid>

        <Grid xs={6}>
          <Box
            sx={{
              position: "relative",
              height: "100%",
              width: "100%",
            }}
          >
            <Image
              src={map}
              alt="map-image"
              fill
              style={{
                objectFit: "contain",
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
