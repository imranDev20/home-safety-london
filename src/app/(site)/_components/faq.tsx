"use client";
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
    <Box sx={{ mt: 20, mb: 15 }}>
      <Container>
        <Grid
          container
          spacing={{
            xs: 0,
            md: 5,
            lg: 10,
          }}
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
            <Typography
              sx={{
                fontWeight: 400,
                textTransform: "uppercase",
                letterSpacing: 2,
                mb: 1,
              }}
            >
              FAQ
            </Typography>
            <Typography
              component="h2"
              sx={{
                mb: 2,
              }}
              fontSize={36}
            >
              Answers to Frequently Asked Questions (FAQs)
            </Typography>

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

                [`& .${accordionSummaryClasses.button}:hover`]: {
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
                    py: 1,
                  }}
                >
                  <AccordionSummary
                    sx={{
                      fontWeight: 600,
                      fontSize: "lg",
                      px: 0,
                    }}
                  >
                    {item.title}
                  </AccordionSummary>
                  <AccordionDetails
                    color="neutral"
                    slotProps={{
                      content: {
                        sx: {
                          px: 0,
                        },
                      },
                    }}
                  >
                    <Typography color="neutral" level="body-lg">
                      {item.content}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </AccordionGroup>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
