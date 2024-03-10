import React from "react";
import { Box, Container, Grid, Typography } from "@mui/joy";
import AccordionGroup from "@mui/joy/AccordionGroup";
import Accordion from "@mui/joy/Accordion";
import AccordionDetails from "@mui/joy/AccordionDetails";
import AccordionSummary from "@mui/joy/AccordionSummary";
import Image from "next/image";
import electric from "../../../public/electric.jpg";

export default function Faq() {
  const [index, setIndex] = React.useState<number | null>(0);
  return (
    <Box>
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "32px",
          fontWeight: "600",
          paddingBottom: "15px",
        }}
      >
        Answers to Frequently Asked Questions (FAQs)
      </Typography>
      <Container>
        <Grid container spacing={3}>
          <Grid xs={6}>
            <Box sx={{}}>
              <Image width={550} src={electric} alt="faq-image" />
            </Box>
          </Grid>
          <Grid xs={6}>
            <AccordionGroup>
              <Accordion
                expanded={index === 0}
                onChange={(event, expanded) => {
                  setIndex(expanded ? 0 : null);
                }}
              >
                <AccordionSummary>First accordion</AccordionSummary>
                <AccordionDetails>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={index === 1}
                onChange={(event, expanded) => {
                  setIndex(expanded ? 1 : null);
                }}
              >
                <AccordionSummary>Second accordion</AccordionSummary>
                <AccordionDetails>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={index === 2}
                onChange={(event, expanded) => {
                  setIndex(expanded ? 2 : null);
                }}
              >
                <AccordionSummary>Third accordion</AccordionSummary>
                <AccordionDetails>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </AccordionDetails>
              </Accordion>
            </AccordionGroup>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
