import React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/joy";
import Image from "next/image";
import electric from "../../../images/eletric.jpg";
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
    <Container sx={{ py: 10 }}>
      <Grid container spacing={4}>
        <Grid xs={6}>
          <Image
            width={550}
            height={500}
            src={electric}
            alt="eletrician-image"
          />
        </Grid>
        <Grid xs={6}>
          <Box>
            <Typography>About Us</Typography>
            <Typography sx={{ fontSize: 30, py: "5px", fontWeight: 600 }}>
              We Make Places Clean & Bright
            </Typography>
            <Typography sx={{ pb: 2 }}>
              London Property Inspections have 15 years experience in providing
              the property compliance certificates to:
            </Typography>

            <Box sx={{ py: 2 }}>
              {categories.map((category, index) => (
                <Typography
                  key={index}
                  sx={{ display: "flex", alignItems: "center", mb: "5px" }}
                >
                  <CheckCircleIcon sx={{ color: "#0b6bcb", mr: 2 }} />
                  <Typography component="span">{category.text}</Typography>
                </Typography>
              ))}
            </Box>

            <Typography sx={{ pb: 2 }}>
              We provide services to residential and commercial properties which
              includes EICR, Fire Safety Certificate, Fire Risk Assessment, PAT
              Testing, Emergency Lighting Certificate, Gas Safety Certificate,
              EPC and any kind of plumbing work, gas repairs, electrical repairs
              from rewiring the buildings to houses in London and M25 area.
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                variant="solid"
                sx={{ px: 4, py: "8px", borderRadius: "50px", fontSize: 16 }}
              >
                Our Services
              </Button>
              <Typography sx={{ display: "flex", alignItems: "center", ml: 4 }}>
                <PhoneIcon />
                <Typography component="span">+123-456-7890</Typography>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
