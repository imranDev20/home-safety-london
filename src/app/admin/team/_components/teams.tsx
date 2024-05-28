import React from "react";
import { Box, Grid, Stack } from "@mui/joy";
import TeamCard from "./team-card";
import { FIXED_HEIGHT } from "@/shared/constants";

const TEAMS = [
  {
    id: 1,
    teamMember: "Nancy Martino",
    degination: "Team Leader & HR",
    project: 225,
    task: 197,
  },
  {
    id: 2,
    teamMember: "Henry Baird",
    degination: "Full Stack Developer",
    project: 352,
    task: 197,
  },
  {
    id: 3,
    teamMember: "Frank Hook",
    degination: "Project Manager",
    project: 225,
    task: 197,
  },
  {
    id: 4,
    teamMember: "Megan Elmore",
    degination: "Team Leader & Web Developer",
    project: 225,
    task: 197,
  },
  {
    id: 5,
    teamMember: "Alexis Clarke",
    degination: "Backend Developer",
    project: 225,
    task: 197,
  },
  {
    id: 6,
    teamMember: "Nathan Cole",
    degination: "Front-End Developer",
    project: 225,
    task: 197,
  },
  {
    id: 7,
    teamMember: "Donald Palmer",
    degination: "Site Manager",
    project: 225,
    task: 197,
  },
  {
    id: 8,
    teamMember: "Jack Gough",
    degination: "General Manager",
    project: 225,
    task: 197,
  },
  {
    id: 9,
    teamMember: "Marie Ward",
    degination: "Senior Engineer",
    project: 225,
    task: 197,
  },
];

export default function Teams() {
  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: "sm",
        flexShrink: 1,
        overflow: "auto",
        minHeight: `calc(100vh - ${FIXED_HEIGHT}px)`,
        height: `calc(100vh - ${FIXED_HEIGHT}px)`,
      }}
    >
      <Stack>
        <Grid container spacing={3}>
          {TEAMS.map((team) => (
            <Grid xs={12} md={6} key={team.id}>
              <TeamCard team={team} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
}
