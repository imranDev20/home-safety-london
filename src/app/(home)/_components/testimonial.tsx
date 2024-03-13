import React from "react";
import { Box, Card, CardContent, Container, Typography } from "@mui/joy";
import StarIcon from "@mui/icons-material/Star";
import { CarouselProvider, Slider, Slide, DotGroup } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

export default function Testimonial() {
  const REVIEW_ITEM = [
    {
      id: 1,
      name: "Shaun Smith",
      intro: "Had an EICR Check",
      review:
        "I was very impressed in regards to the service provided. They are very professional, technician visit was punctual and the EICR report was complete and quickly released. I will use them again next time for sure.",
    },
    {
      id: 2,
      name: "Emily Johnson",
      intro: "Had an EICR Check",
      review:
        "I was very impressed in regards to the service provided. They are very professional, technician visit was punctual and the EICR report was complete and quickly released. I will use them again next time for sure.",
    },
    {
      id: 3,
      name: "Noah Williams",
      intro: "Had an EICR Check",
      review:
        "I was very impressed in regards to the service provided. They are very professional, technician visit was punctual and the EICR report was complete and quickly released. I will use them again next time for sure.",
    },
    {
      id: 4,
      name: "Olivia Brown",
      intro: "Had an EICR Check",
      review:
        "I was very impressed in regards to the service provided. They are very professional, technician visit was punctual and the EICR report was complete and quickly released. I will use them again next time for sure.",
    },
    {
      id: 5,
      name: "Ethan Jones",
      intro: "Had an EICR Check",
      review:
        "I was very impressed in regards to the service provided. They are very professional, technician visit was punctual and the EICR report was complete and quickly released. I will use them again next time for sure.",
    },
    {
      id: 6,
      name: "Benjamin Miller",
      intro: "Had an EICR Check",
      review:
        "I was very impressed in regards to the service provided. They are very professional, technician visit was punctual and the EICR report was complete and quickly released. I will use them again next time for sure.",
    },
    {
      id: 7,
      name: "Sophia Wilson",
      intro: "Had an EICR Check",
      review:
        "I was very impressed in regards to the service provided. They are very professional, technician visit was punctual and the EICR report was complete and quickly released. I will use them again next time for sure.",
    },
    {
      id: 8,
      name: "Babel Davis",
      intro: "Had an EICR Check",
      review:
        "I was very impressed in regards to the service provided. They are very professional, technician visit was punctual and the EICR report was complete and quickly released. I will use them again next time for sure.",
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
        totalSlides={REVIEW_ITEM.length}
        visibleSlides={3}
        infinite
        isPlaying
        interval={5000}
      >
        <Slider>
          {REVIEW_ITEM.map((slides, index) => (
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
                      {slides.name}
                    </Typography>
                    <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
                      {slides.intro}
                    </Typography>
                    <Typography sx={{ my: "3px" }}>
                      {[...Array(5)].map((_, index) => (
                        <StarIcon key={index} sx={{ color: "yellow" }} />
                      ))}
                    </Typography>

                    <FormatQuoteIcon sx={{ fontSize: 50, color: "#0b6bcb" }} />
                    <Typography sx={{ textAlign: "center", fontSize: 18 }}>
                      {slides.review}
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
        </Box>
      </CarouselProvider>
    </Container>
  );
}
