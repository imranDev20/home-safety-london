import React from "react";
import { Box, Card, CardContent, Container, Typography } from "@mui/joy";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import Image from "next/image";
import sponsor from "../../../../public/sponer.png";

const SPONSER_PARTNER = [
  {
    id: 1,
    image: sponsor,
  },
  {
    id: 2,
    image: sponsor,
  },
  {
    id: 3,
    image: sponsor,
  },
  {
    id: 4,
    image: sponsor,
  },
  {
    id: 5,
    image: sponsor,
  },
  {
    id: 6,
    image: sponsor,
  },
  {
    id: 7,
    image: sponsor,
  },
  {
    id: 8,
    image: sponsor,
  },
  {
    id: 9,
    image: sponsor,
  },
  {
    id: 10,
    image: sponsor,
  },
];

export default function Sponser() {
  return (
    <Container component="section">
      <Box sx={{ textAlign: "center", paddingY: "20px" }}>
        <Typography sx={{ fontSize: "32px", fontWeight: 600 }}>
          Accreditations
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
                  src={sponsor}
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
