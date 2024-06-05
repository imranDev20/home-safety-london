"use client";
import "pure-react-carousel/dist/react-carousel.es.css";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CarouselProvider, Slide, Slider } from "pure-react-carousel";
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

import TestimonialCard from "./testimonial-card";
import TestimonialForm from "./testimonial-form";
import { getTestimonials } from "@/services/testimonial.services";
import { GetTestimonialsResponse } from "@/types/response";

export default function Testimonials() {
  const [slidesToShow, setSlidesToShow] = useState<number>(3);
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 600) {
        setSlidesToShow(1);
      } else if (window.innerWidth <= 960) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(2);
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { data: testimonialData, isLoading: isGetTestimonialsLoading } =
    useQuery<GetTestimonialsResponse>({
      queryKey: ["testimonials"],
      queryFn: () => getTestimonials(),
    });

  console.log(testimonialData);

  if (isGetTestimonialsLoading) {
    return <CircularProgress />;
  }

  if (!testimonialData) {
    return "Testimonials not found...";
  }

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
                What Our Customers Say About Us
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
                Our customer rating of 4.5 /5 averages from 1.2k Review on the
                Calculate
              </Typography>
            </Box>
          </Grid>
          {/* <Grid xs={12} md={8}>
            <CarouselProvider
              naturalSlideWidth={400}
              naturalSlideHeight={200}
              isIntrinsicHeight={true}
              totalSlides={testimonialData?.pagination?.totalCount as number}
              visibleSlides={slidesToShow}
              infinite
              isPlaying
              interval={5000}
            >
              <Slider>
                {testimonialData?.data?.map((slide, index) => (
                  <Slide index={index} key={index}>
                    <TestimonialCard slide={slide} />
                  </Slide>
                ))}
              </Slider>
            </CarouselProvider>
          </Grid> */}
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
