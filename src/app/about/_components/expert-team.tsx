"use client";
import React from "react";
import { Box, Card, Container, Grid, Typography } from "@mui/joy";
import engineer from "../../../images/electric.jpg";
import Image from "next/image";
import { theme } from "@/shared/theme";

const TEAMS = [
  {
    id: 1,
    expertName: "Anglila Vigil",
    expertPost: "Engineer",
    expertImage: engineer,
  },
  {
    id: 2,
    expertName: "Frank Michel",
    expertPost: "Technician",
    expertImage: engineer,
  },
  {
    id: 3,
    expertName: "Kamal Hassan",
    expertPost: "CEO & Founder",
    expertImage: engineer,
  },
  {
    id: 4,
    expertName: "David Willey",
    expertPost: "Manager",
    expertImage: engineer,
  },
];

export default function ExpertTeam() {
  return (
    <Container sx={{ my: 10 }}>
      <Box sx={{ textAlign: "center", pb: 4 }}>
        <Typography component="h4" level="h4">
          Our Team
        </Typography>
        <Typography component="h1" level="h1" color="primary">
          Our Experts Team
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {TEAMS.map((team) => (
          <Grid xs={3} key={team.id}>
            <Box sx={{ mb: 3 }}>
              <Box>
                <Image
                  src={team.expertImage}
                  alt="expertImage"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 10,
                    overflow: "hidden",
                    objectFit: "cover",
                  }}
                />
              </Box>

              <Card
                variant="soft"
                sx={{
                  borderRadius: 0,
                  mt: -5,
                  mr: 3,
                  borderRight: 4,
                  borderRightColor:
                    theme.colorSchemes.light.palette.secondary[500],
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                  borderBottomLeftRadius: 10,
                }}
              >
                <Box>
                  <Typography component="h4" level="h4">
                    {team.expertName}
                  </Typography>
                  <Typography color="secondary">{team.expertPost}</Typography>
                </Box>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
