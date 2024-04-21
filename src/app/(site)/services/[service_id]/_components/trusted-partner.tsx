"use client";
import React from "react";
import { CarouselProvider, Slide, Slider } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { Box, Container, Typography } from "@mui/joy";
import Image from "next/image";
import brandIamge from "@/images/brand-sponser.webp";

const SPONSER_PARTNER = [
  {
    id: 1,
    image: brandIamge,
  },
  {
    id: 2,
    image: brandIamge,
  },
  {
    id: 3,
    image: brandIamge,
  },
  {
    id: 4,
    image: brandIamge,
  },
  {
    id: 5,
    image: brandIamge,
  },
  {
    id: 6,
    image: brandIamge,
  },
  {
    id: 7,
    image: brandIamge,
  },
  {
    id: 8,
    image: brandIamge,
  },
  {
    id: 9,
    image: brandIamge,
  },
  {
    id: 10,
    image: brandIamge,
  },
];

export default function TrustedPartner() {
  return (
    <Container component="section" sx={{ my: 10 }}>
      <Box sx={{ textAlign: "center", paddingY: "20px" }}>
        <Typography sx={{ fontSize: "32px", fontWeight: 600 }}>
          Certified and Trusted Professional Engineers
        </Typography>
      </Box>
      <CarouselProvider
        naturalSlideWidth={50}
        naturalSlideHeight={50}
        totalSlides={10}
        infinite
        isPlaying
        interval={5000}
        visibleSlides={6}
      >
        <Slider>
          {SPONSER_PARTNER.map((partner, index) => (
            <Slide index={0} key={index}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Image
                  width={120}
                  height={150}
                  src={partner.image}
                  alt="sponser-image"
                />
              </Box>
            </Slide>
          ))}
        </Slider>
      </CarouselProvider>
    </Container>
  );
}
