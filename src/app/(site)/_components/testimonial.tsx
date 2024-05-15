"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Sheet,
  Typography,
} from "@mui/joy";
import { useTheme } from "@mui/joy/styles";
import StarIcon from "@mui/icons-material/Star";
import { CarouselProvider, Slider, Slide, DotGroup } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import TestimonialForm from "./testimonial-form";
import { useQuery } from "@tanstack/react-query";
import { getTestimonials } from "@/services/testimonial.services";
import { GetTestimonialsResponse } from "@/types/testimonial";

export default function Testimonial() {
  const theme = useTheme();
  const [slidesToShow, setSlidesToShow] = useState(3);
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
            {testimonialData?.data.map((slides, index) => (
              <Slide index={0} key={index}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: 2,
                  }}
                >
                  <Card variant="plain">
                    <CardContent
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <FormatQuoteIcon
                        color="primary"
                        sx={{
                          fontSize: 40,
                        }}
                      />
                      <Typography
                        level="title-lg"
                        component="h4"
                        sx={{
                          my: 2,
                        }}
                      >
                        {slides.subject}
                      </Typography>
                      <Typography
                        color="neutral"
                        sx={{
                          my: 2,
                          textAlign: "center",
                        }}
                      >
                        {slides.content}
                      </Typography>

                      <Typography>
                        {[...Array(slides.rating)].map((_, index) => (
                          <StarIcon key={index} sx={{ color: "#ECBD41" }} />
                        ))}

                        {[...Array(5 - slides.rating)].map((_, index) => (
                          <StarIcon key={index} sx={{ color: "#DBDBDB" }} />
                        ))}
                      </Typography>

                      <Typography level="title-md">{slides.name}</Typography>
                    </CardContent>
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
              mb: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                "& .carousel__dot": {
                  backgroundColor: theme.colorSchemes.light.palette.divider,
                  border: "1px",
                  width: "9px",
                  height: "9px",
                  margin: "0px 4px",
                  padding: "0px",
                  borderRadius: "50%",
                  transition: ".3s all",
                },
                "& .carousel__dot--selected": {
                  width: "20px",
                  height: "8px",
                  borderRadius: "10px",
                  transition: ".3s all",
                  backgroundColor:
                    theme.colorSchemes.light.palette.primary[600],
                },
              }}
            >
              <DotGroup
                showAsSelectedForCurrentSlideOnly
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            </Box>
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
