import React from "react";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/joy";
import Image from "next/image";
import electric from "../../../images/home-about-image.jpeg";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PhoneIcon from "@mui/icons-material/Phone";

const categories = [
  { text: "Landlords" },
  { text: "Homeowners" },
  { text: "Homebuyers" },
  { text: "Home sellers" },
  { text: "Estate Agents" },
];

export default function About() {
  return (
    <Container sx={{ my: 20 }}>
      <Grid container spacing={4}>
        <Grid xs={6}>
          <Box
            sx={{
              width: "100%",
              position: "relative",
              height: "100%",
              borderRadius: 5,
              overflow: "hidden",
            }}
          >
            <Image
              fill
              style={{
                objectFit: "cover",
              }}
              sizes="500px"
              // sizes="(max-width: 768px) 30vw, 15vw"
              src={electric}
              alt="eletrician-image"
            />
          </Box>
        </Grid>
        <Grid xs={6}>
          <Box>
            <Typography
              level="title-md"
              color="primary"
              sx={{
                mb: 1,
              }}
            >
              About Us
            </Typography>
            <Typography
              component="h2"
              level="h2"
              sx={{
                mb: 2,
              }}
            >
              We Make Places Clean & Bright
            </Typography>
            <Typography color="neutral">
              London Property Inspections have 15 years experience in providing
              the property compliance certificates to:
            </Typography>

            <Box sx={{ my: 3 }}>
              {categories.map((category, index) => (
                <Typography
                  key={index}
                  sx={{ display: "flex", alignItems: "center", mb: "5px" }}
                >
                  <CheckCircleIcon color="primary" sx={{ mr: 2 }} />
                  <Typography component="span" color="neutral">
                    {" "}
                    {category.text}
                  </Typography>
                </Typography>
              ))}
            </Box>

            <Typography color="neutral">
              We provide services to residential and commercial properties which
              includes EICR, Fire Safety Certificate, Fire Risk Assessment, PAT
              Testing, Emergency Lighting Certificate, Gas Safety Certificate,
              EPC and any kind of plumbing work, gas repairs, electrical repairs
              from rewiring the buildings to houses in London and M25 area.
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              sx={{
                mt: 3,
              }}
            >
              <Button variant="solid" size="lg">
                More About Us
              </Button>

              <Button
                startDecorator={<PhoneIcon />}
                variant="plain"
                color="secondary"
                size="lg"
              >
                +123-456-7890
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
