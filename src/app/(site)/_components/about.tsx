import React from "react";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/joy";
import { useTheme } from "@mui/joy/styles";
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
  const theme = useTheme();

  return (
    <Container sx={{ my: 20 }}>
      <Grid container spacing={4}>
        <Grid xs={12} md={6}>
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
                layout="intrinsic"
                width={500}
                objectFit="cover"
                style={{
                  width: "100%",
                  objectFit: "cover",
                }}
                // sizes="(max-width: 768px) 30vw, 15vw"
                sizes="500px"
                src={electric}
                alt="eletrician-image"
              />
            </Box>
          </Box>
        </Grid>
        <Grid xs={12} md={6}>
          <Box>
            <Typography
              sx={{
                color: theme.colorSchemes.light.palette.secondary[500],
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: 2,
                mb: 1,
              }}
            >
              About us
            </Typography>
            <Typography
              component="h1"
              level="h1"
              sx={{
                mb: 2,
              }}
            >
              We Are Commited to <br />
              <Typography
                component="span"
                sx={{
                  color: theme.colorSchemes.light.palette.secondary[500],
                  fontWeight: 700,
                }}
              >
                Provide Quality
              </Typography>{" "}
              Service
            </Typography>
            <Typography color="neutral">
              London Property Inspections have 15 years experience in providing
              the property compliance certificates to:
            </Typography>

            <Box sx={{ my: 3 }}>
              {categories.map((category, index) => (
                <Typography
                  key={index}
                  sx={{ display: "flex", alignItems: "center", mb: 1 }}
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
