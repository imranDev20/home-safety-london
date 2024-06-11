"use client";
import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
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
      title: "What is an EPC and why do I need one?",
      content:
        "An Energy Performance Certificate (EPC) provides information about the energy efficiency of a property. It's required for properties being sold or rented and helps improve energy use and reduce costs.",
    },
    {
      title:
        "How often should I have an Electrical Installation Condition Report (EICR) conducted?",
      content:
        "It's recommended to have an EICR conducted every 5 years for rented properties and every 10 years for owner-occupied homes. Regular inspections ensure your electrical systems are safe and compliant with regulations.",
    },
    {
      title: "What does a Gas Safety Certificate entail?",
      content:
        "A Gas Safety Certificate confirms that all gas appliances, fittings, and flues in a property are safe to use. It's a legal requirement for landlords to have an annual gas safety check conducted by a registered engineer.",
    },
    {
      title: "Why is PAT Testing important for my home?",
      content:
        "Portable Appliance Testing (PAT) is important to ensure that electrical appliances are safe to use. Regular PAT testing helps prevent electrical hazards and ensures compliance with safety standards.",
    },
    {
      title:
        "How can I benefit from installing an EV charging station at home?",
      content:
        "Installing an EV charging station at home offers convenience and cost savings for electric vehicle owners. It ensures your vehicle is always ready to go and can increase the value of your property.",
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
              component="h2"
              sx={{
                mb: 2,
              }}
              fontSize={36}
            >
              Frequently Asked Questions
            </Typography>

            <Typography
              color="neutral"
              sx={{
                mb: 3,
                lineHeight: 1.8,
              }}
            >
              Got questions? We&apos;ve got answers! Here are some of the most
              common questions we receive from our customers, along with clear
              and helpful answers to guide you through our services and
              processes.
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
