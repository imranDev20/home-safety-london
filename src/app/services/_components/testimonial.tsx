import React from "react";
import { Box, Container, Grid, Typography } from "@mui/joy";
import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  Slide,
  Slider,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const SERVICE_TETIMONIAL = [
  {
    id: 1,
    title: "Hero Product One",
    intro:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem fugiat sed aut numquam ratione sunt porro consectetur enim, expedita accusamus.",
  },
  {
    id: 2,
    title: "Hero Product Two",
    intro:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem fugiat sed aut numquam ratione sunt porro consectetur enim, expedita accusamus.",
  },
  {
    id: 3,
    title: "Hero Product Three",
    intro:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem fugiat sed aut numquam ratione sunt porro consectetur enim, expedita accusamus.",
  },
  {
    id: 4,
    title: "Hero Product Four",
    intro:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem fugiat sed aut numquam ratione sunt porro consectetur enim, expedita accusamus.",
  },
  {
    id: 5,
    title: "Hero Product Five",
    intro:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem fugiat sed aut numquam ratione sunt porro consectetur enim, expedita accusamus.",
  },
  {
    id: 6,
    title: "Hero Product Six",
    intro:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem fugiat sed aut numquam ratione sunt porro consectetur enim, expedita accusamus.",
  },
];

export default function ServiceTestimonial() {
  return (
    <Container sx={{ py: 5 }}>
      <CarouselProvider
        naturalSlideWidth={300}
        naturalSlideHeight={100}
        totalSlides={6}
        infinite
        isPlaying
        interval={5000}
      >
        <Slider>
          <Grid container spacing={2} sx={{ display: "flex" }}>
            {SERVICE_TETIMONIAL.map((testimonial, index) => {
              return (
                <Grid xs={4} key={index}>
                  <Slide
                    index={0}
                    key={index}
                    style={{ backgroundColor: "red" }}
                  >
                    <Box sx={{ border: "1px solid gray" }}>
                      <Typography>{testimonial.title}</Typography>
                    </Box>
                  </Slide>
                </Grid>
              );
            })}
          </Grid>
        </Slider>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            mt: 2,
          }}
        >
          <ButtonBack
            style={{
              borderRadius: "50%",
              padding: "5px 8px",
              border: 0,
              backgroundColor: "black",
              marginRight: 10,
            }}
          >
            <ArrowBackIcon sx={{ color: "white", fontSize: 28 }} />
          </ButtonBack>
          <ButtonNext
            style={{
              borderRadius: "50%",
              padding: "5px 8px",
              border: 0,
              backgroundColor: "black",
            }}
          >
            <ArrowForwardIcon sx={{ color: "white", fontSize: 28 }} />
          </ButtonNext>
        </Box>
      </CarouselProvider>
    </Container>
  );
}
