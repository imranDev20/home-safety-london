import React from "react";
import { Box, Container, Typography } from "@mui/joy";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import Image from "next/image";
import NapitImage from "../../../images/partner-logos/napit.png";
import GasSafeRegister from "../../../images/partner-logos/gas-safe-register.svg";
import Nebosh from "../../../images/partner-logos/nebosh.svg";

const SPONSER_PARTNER = [
  {
    id: 1,
    image: NapitImage,
  },
  {
    id: 2,
    image: GasSafeRegister,
  },
  {
    id: 3,
    image: Nebosh,
  },
  {
    id: 4,
    image: NapitImage,
  },
  {
    id: 5,
    image: NapitImage,
  },
  {
    id: 6,
    image: NapitImage,
  },
  {
    id: 7,
    image: NapitImage,
  },
  {
    id: 8,
    image: NapitImage,
  },
  {
    id: 9,
    image: NapitImage,
  },
  {
    id: 10,
    image: NapitImage,
  },
];

export default function Partners() {
  return (
    <Container sx={{ py: 8 }}>
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Typography component="h2" level="h2" sx={{ mb: 5 }}>
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
        visibleSlides={7}
      >
        <Slider>
          {SPONSER_PARTNER.map((partner, index) => (
            <Slide index={partner.id} key={index}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  width: 80,
                  position: "relative",
                }}
              >
                {partner.image?.src ? (
                  <Image
                    fill
                    style={{
                      objectFit: "contain",
                    }}
                    src={partner.image}
                    alt="sponser-image"
                  />
                ) : (
                  <partner.image />
                )}
              </Box>
            </Slide>
          ))}
        </Slider>
      </CarouselProvider>
    </Container>
  );
}
