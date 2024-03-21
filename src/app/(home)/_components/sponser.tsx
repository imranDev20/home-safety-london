import React from "react";
import { Box, Card, CardContent, Container, Typography } from "@mui/joy";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import Image from "next/image";
import sponsor from "../../../images/sponer.png";

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
    <Container sx={{ py: 8 }}>
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Typography component="h2" level="h2" sx={{ mb: 4 }}>
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
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
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
