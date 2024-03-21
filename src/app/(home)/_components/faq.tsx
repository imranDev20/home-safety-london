import React, { useState } from "react";
import { Box, Container, Divider, Grid, Sheet, Typography } from "@mui/joy";
import AccordionGroup from "@mui/joy/AccordionGroup";
import Accordion from "@mui/joy/Accordion";
import AccordionDetails from "@mui/joy/AccordionDetails";
import AccordionSummary from "@mui/joy/AccordionSummary";
import { theme } from "@/shared/theme";
import enginnerNote from "../../../images/engineer-note.jpg";
import Image from "next/image";

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
    <Sheet variant="soft">
      <Box sx={{ py: 10 }}>
        <Typography
          component="h2"
          level="h2"
          sx={{
            textAlign: "center",
            mb: 5,
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
            <Grid xs={6} sx={{ height: "100%" }}>
              <Image
                src={enginnerNote}
                alt="faqNote"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 15,
                  overflow: "hidden",
                  objectFit: "cover",
                }}
              />
            </Grid>
            <Grid xs={6}>
              <AccordionGroup transition="0.2s">
                {/* Map over the array to render each Accordion */}
                {accordionData.map((accordion, id) => (
                  <Accordion
                    key={id}
                    expanded={index === id}
                    onChange={(event, expanded) => {
                      setIndex(expanded ? id : null);
                    }}
                    sx={{
                      border: 1,
                      borderColor: theme.colorSchemes.light.palette.primary[50],
                      backgroundColor: "white",
                      mb: 1.5,
                      boxShadow:
                        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                    }}
                  >
                    <AccordionSummary>
                      <Typography
                        component="h4"
                        level="h4"
                        sx={{
                          py: 1,
                        }}
                      >
                        {accordion.title}
                      </Typography>
                    </AccordionSummary>
                    {index === id && <Divider />}
                    <AccordionDetails>
                      <Typography sx={{ py: 2 }}>
                        {accordion.content}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </AccordionGroup>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Sheet>
  );
}
