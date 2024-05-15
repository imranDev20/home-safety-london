"use client";
import "pure-react-carousel/dist/react-carousel.es.css";

import React, { useEffect, useState } from "react";
import { Box, Button, Container, Sheet, Typography } from "@mui/joy";
import { useTheme } from "@mui/joy/styles";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import TestimonialForm from "./testimonial-form";
import { useQuery } from "@tanstack/react-query";
import { getTestimonials } from "@/services/testimonial.services";
import { GetTestimonialsResponse } from "@/types/testimonial";
import TestimonialCard from "./testimonial-card";

export default function Testimonial() {
  const theme = useTheme();
  const [slidesToShow, setSlidesToShow] = useState<number>(3);
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 600) {
        setSlidesToShow(1);
      } else if (window.innerWidth <= 960) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { data: testimonialData, isLoading: isGetTestimonialsLoading } =
    useQuery<GetTestimonialsResponse>({
      queryKey: ["testimonials"],
      queryFn: async () => {
        const response = await getTestimonials();
        return response;
      },
    });

  return (
    <Sheet
      variant="soft"
      sx={{
        mt: 5,
        py: 10,
      }}
    >
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            py: 2,
          }}
        >
          <Typography
            component="h2"
            level="h1"
            sx={{
              mb: 3,
              textAlign: "center",
            }}
          >
            What Our Customers Say About Us
          </Typography>
        </Box>

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
            {testimonialData?.data.map((slide, index) => (
              <Slide index={index} key={index}>
                <TestimonialCard slide={slide} />
              </Slide>
            ))}
          </Slider>
          {/* Dot Group */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 2,
              mb: 4,
            }}
          >
            {/* ... (dot group styles remain the same) */}
          </Box>
        </CarouselProvider>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
          <Button size="lg" variant="solid" onClick={() => setOpenModal(true)}>
            Leave a Testimonial
          </Button>
          <TestimonialForm openModal={openModal} setOpenModal={setOpenModal} />
        </Box>
      </Container>
    </Sheet>
  );
}
