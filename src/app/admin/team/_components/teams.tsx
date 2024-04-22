import React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import {
  Box,
  ButtonGroup,
  Container,
  Grid,
  IconButton,
  Stack,
  SvgIcon,
  useTheme,
} from "@mui/joy";
import Image from "next/image";
import engineer from "../../../../images/engineer-note.jpg";
import Team from "./team";

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
    <>
      <Stack>
        <Grid container spacing={3}>
          {TEAMS.map((team) => (
            <Grid xs={4} key={team.id}>
              <Team team={team} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </>
  );
}
