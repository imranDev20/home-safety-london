"use client";
import React from "react";
import { Box, Container, Typography } from "@mui/joy";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import Image from "next/image";
import NapitImage from "../../../images/partner-logos/napit.png";
import GasSafeRegister from "../../../images/partner-logos/gas-safe-register.svg";
import Nebosh from "../../../images/partner-logos/nebosh.svg";
import TrustMark from "@/images/partner-logos/trustmark.jpeg";
import IFSM from "@/images/partner-logos/ifsm.png";
import NICEIC from "@/images/partner-logos/niceic.svg";
import CityGuilds from "@/images/partner-logos/city-guilds.svg";
import ElmhurstEnergy from "@/images/partner-logos/elmhurst-energy.jpeg";
import EalRecognised from "@/images/partner-logos/eal.png";
import PartP from "@/images/partner-logos/part-p.png";

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
    image: TrustMark,
  },
  {
    id: 5,
    image: IFSM,
  },
  {
    id: 6,
    image: NICEIC,
  },
  {
    id: 7,
    image: CityGuilds,
  },
  {
    id: 8,
    image: ElmhurstEnergy,
  },
  {
    id: 9,
    image: EalRecognised,
  },
  {
    id: 10,
    image: PartP,
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
        <Typography component="h2" level="h2" sx={{ mb: 3 }}>
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
                  width:
                    partner.id === 4 ||
                    partner.id === 5 ||
                    partner.id === 8 ||
                    partner.id === 9
                      ? 130
                      : 80,
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
