import React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/joy";
import Image from "next/image";
import electric from "../../../../../images/eletric.jpg";

export default function ServiceAbout() {
  return (
    <Container sx={{ pt: 5 }}>
      <Grid
        container
        spacing={4}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Grid xs={12} md={6} order={{ xs: 2, sm: 2, md: 1 }}>
          <Box>
            <Typography level="h1" component="h2" sx={{ mb: 3 }}>
              Unsure of which safety check is right for you?
            </Typography>
            <Typography level="body-md">
              Don’t worry it can be confusing choosing the right Landlord Safety
              Certificate. Our friendly team can help you choose the right
              safety certificate.
            </Typography>
            <Button variant="solid" sx={{ mt: 3 }}>
              TALK TO FRIENDLY ADVISER
            </Button>
          </Box>
        </Grid>
        <Grid xs={12} md={6} order={{ xs: 1, sm: 1, md: 2 }}>
          <Box
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 20,
              overflow: "hidden",
            }}
          >
            <Image
              width={500}
              height={500}
              objectFit="cover"
              style={{
                width: "100%",
                objectFit: "cover",
              }}
              // sizes="(max-width: 768px) 30vw, 15vw"
              sizes="500px"
              src={electric}
              alt="engineer-image"
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
