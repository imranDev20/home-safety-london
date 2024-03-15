import React, { useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/joy";
import AccordionGroup from "@mui/joy/AccordionGroup";
import Accordion from "@mui/joy/Accordion";
import AccordionDetails from "@mui/joy/AccordionDetails";
import AccordionSummary from "@mui/joy/AccordionSummary";

export default function Faq() {
  const [index, setIndex] = useState<number | null>(null);

  // Array containing the data for each Accordion
  const accordionData = [
    {
      title: "First accordion show",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      title: "Second accordion show",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      title: "Third accordion show ",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      title: "Forth accordion show",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      title: "Five accordion show",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      title: "Six accordion show",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  return (
    <Box sx={{ paddingY: "30px" }}>
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
        <Grid
          container
          spacing={3}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Grid xs={10}>
            <AccordionGroup variant="outlined" transition="0.2s">
              {/* Map over the array to render each Accordion */}
              {accordionData.map((accordion, id) => (
                <Accordion
                  key={id}
                  expanded={index === id}
                  onChange={(event, expanded) => {
                    setIndex(expanded ? id : null);
                  }}
                >
                  <AccordionSummary>{accordion.title}</AccordionSummary>
                  <AccordionDetails>{accordion.content}</AccordionDetails>
                </Accordion>
              ))}
            </AccordionGroup>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
