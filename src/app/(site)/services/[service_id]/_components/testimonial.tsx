import React from "react";
import { Box, Card, Container, Typography } from "@mui/joy";
import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  DotGroup,
  Slide,
  Slider,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StarIcon from "@mui/icons-material/Star";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

export default function ServiceTestimonial() {
  const SERVICE_TETIMONIAL = [
    {
      id: 1,
      title: "James Smith",
      intro:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem fugiat sed aut numquam ratione sunt porro consectetur enim, expedita accusamus.",
    },
    {
      id: 2,
      title: "Emma Johnson",
      intro:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem fugiat sed aut numquam ratione sunt porro consectetur enim, expedita accusamus.",
    },
    {
      id: 3,
      title: "Alexander Brown",
      intro:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem fugiat sed aut numquam ratione sunt porro consectetur enim, expedita accusamus.",
    },
    {
      id: 4,
      title: "Olivia Taylor",
      intro:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem fugiat sed aut numquam ratione sunt porro consectetur enim, expedita accusamus.",
    },
    {
      id: 5,
      title: "Ethan Martinez",
      intro:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem fugiat sed aut numquam ratione sunt porro consectetur enim, expedita accusamus.",
    },
    {
      id: 6,
      title: "Sophia Anderson",
      intro:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem fugiat sed aut numquam ratione sunt porro consectetur enim, expedita accusamus.",
    },
  ];
  return (
    <Container sx={{ py: 5 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          py: 2,
        }}
      >
        <Typography sx={{ fontSize: 30, fontWeight: 600 }}>
          What our customers say about us
        </Typography>
        <Typography sx={{}}>
          {[...Array(5)].map((_, index) => (
            <StarIcon key={index} sx={{ color: "yellow" }} />
          ))}
        </Typography>
      </Box>

      <CarouselProvider
        naturalSlideWidth={400}
        naturalSlideHeight={200}
        isIntrinsicHeight={true}
        totalSlides={SERVICE_TETIMONIAL.length}
        visibleSlides={3}
        infinite
        isPlaying
        interval={5000}
      >
        <Slider>
          {SERVICE_TETIMONIAL.map((slides, index) => (
            <Slide index={0} key={index}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  mx: 2,
                }}
              >
                <Card variant="soft" sx={{ textAlign: "center", p: 4 }}>
                  <Box>
                    <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
                      {slides.title}
                    </Typography>
                    <Typography sx={{ my: "3px" }}>
                      {[...Array(5)].map((_, index) => (
                        <StarIcon key={index} sx={{ color: "yellow" }} />
                      ))}
                    </Typography>

                    <FormatQuoteIcon sx={{ fontSize: 50, color: "#0b6bcb" }} />
                    <Typography sx={{ textAlign: "center", fontSize: 18 }}>
                      {slides.intro}
                    </Typography>
                  </Box>
                </Card>
              </Box>
            </Slide>
          ))}
        </Slider>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 2,
          }}
        >
          <ButtonBack
            style={{
              borderRadius: "50%",
              padding: "5px 8px",
              border: 0,
              backgroundColor: "#6267a1",
              marginRight: 10,
            }}
          >
            <ArrowBackIcon sx={{ color: "white", fontSize: 28 }} />
          </ButtonBack>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              "& .carousel__dot": {
                backgroundColor: "#c3c4ca",
                border: "1px",
                width: "9px",
                height: "9px",
                margin: "0px 4px",
                padding: "0px",
                borderRadius: "50%",
              },
              "& .carousel__dot--selected": {
                width: "20px",
                height: "8px",
                borderRadius: "10px",
                backgroundColor: "#6267a1",
              },
            }}
          >
            <DotGroup
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          </Box>

          <ButtonNext
            style={{
              borderRadius: "50%",
              padding: "5px 8px",
              border: 0,
              backgroundColor: "#6267a1",
            }}
          >
            <ArrowForwardIcon sx={{ color: "white", fontSize: 28 }} />
          </ButtonNext>
        </Box>
      </CarouselProvider>
    </Container>
  );
}
