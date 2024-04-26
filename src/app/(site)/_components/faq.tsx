import React, { useState } from "react";
import {
  Box,
  Container,
  Divider,
  Grid,
  Sheet,
  Typography,
  accordionSummaryClasses,
} from "@mui/joy";
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
            <Grid xs={12} md={6} sx={{ height: "100%" }}>
              <Image
                src={enginnerNote}
                alt="faqNote"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 5,
                  overflow: "hidden",
                  objectFit: "cover",
                }}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <AccordionGroup
                variant="outlined"
                transition="0.2s"
                size="lg"
                sx={{
                  border: "none",
                  [`& .${accordionSummaryClasses.button}`]: {
                    bgcolor: "transparent",
                    py: 1.2,
                  },
                  [`& .${accordionSummaryClasses.button}:active`]: {
                    bgcolor: "transparent!important",
                  },
                }}
              >
                {accordionData.map((item, index) => (
                  <Accordion
                    defaultExpanded={index === 0}
                    key={item.title}
                    sx={{
                      mb: 1,
                      color: theme.vars.palette.primary,
                    }}
                  >
                    <AccordionSummary
                      sx={{
                        fontWeight: 600,
                      }}
                    >
                      {item.title}
                    </AccordionSummary>
                    <AccordionDetails color="neutral">
                      {item.content}
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
