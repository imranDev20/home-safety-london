import React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/joy";
import Image from "next/image";
import engineer from "@/images/engineer.webp";

export default function ServiceAbout() {
  return (
    <Container sx={{ pt: 5 }}>
      <Grid
        container
        spacing={3}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Grid xs={6}>
          <Box>
            <Typography>
              Unsure of which safety check is right for you?
            </Typography>
            <Typography>
              Don’t worry it can be confusing choosing the right Landlord Safety
              Certificate. Our friendly team can help you choose the right
              safety certificate.
            </Typography>
            <Button variant="solid">TALK TO FRIENDLY ADVISER</Button>
          </Box>
        </Grid>
        <Grid xs={6}>
          <Box sx={{ width: "100%" }}>
            <Image
              width={560}
              height={500}
              src={engineer}
              alt="engineer-image"
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
