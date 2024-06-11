"use client";
import "pure-react-carousel/dist/react-carousel.es.css";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Star } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Sheet,
  Typography,
} from "@mui/joy";
import TestimonialForm from "./testimonial-form";
import { getTestimonials } from "@/services/testimonial.services";
import { GetTestimonialsResponse } from "@/types/response";
import { CarouselProvider, Slide, Slider } from "pure-react-carousel";
import TestimonialCard from "./testimonial-card";
import TestimonialSlider from "./testimonial-slider";

export default function Testimonials() {
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  return (
    <Sheet
      sx={{
        mt: 5,
        py: 10,
        backgroundColor: "white",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid xs={12} md={4}>
            <Box
              sx={{
                py: 2,
              }}
            >
              <Typography
                level="h1"
                component="h2"
                fontSize={40}
                sx={{
                  mb: 4,
                }}
              >
                Hear from Our Satisfied Customers
              </Typography>

              <Box
                sx={{
                  my: 2,
                }}
              >
                {[...Array(5)].map((_, index) => (
                  <Star
                    sx={{
                      fontSize: 30,
                      color: "#ECBD41",
                    }}
                    key={index}
                  />
                ))}
              </Box>

              <Typography level="body-lg" color="neutral">
                Our commitment to excellence and customer satisfaction shines
                through in their words.
              </Typography>
            </Box>
          </Grid>
          <Grid xs={12} md={8}>
            <TestimonialSlider />
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 10,
          }}
        >
          <Button size="lg" variant="solid" onClick={() => setOpenModal(true)}>
            Leave a Testimonial
          </Button>
          <TestimonialForm openModal={openModal} setOpenModal={setOpenModal} />
        </Box>
      </Container>
    </Sheet>
  );
}
