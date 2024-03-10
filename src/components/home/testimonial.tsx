import React from "react";
import { Box, Card, CardContent, Container, Typography } from "@mui/joy";
import StarIcon from "@mui/icons-material/Star";
import { CarouselProvider, Slider, Slide, DotGroup } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

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

export default function Testimonial() {
  return (
    <Container component="section" sx={{ paddingY: "20px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
          marginBottom: "10px",
        }}
      >
        <Typography
          sx={{ fontSize: "24px", fontWeight: 600, paddingBottom: "10px" }}
        >
          What our customers say about us
        </Typography>
        <Typography>
          {[...Array(5)].map((_, index) => (
            <StarIcon key={index} sx={{ color: "yellow" }} />
          ))}
        </Typography>
      </Box>

      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={50}
        totalSlides={8}
        infinite
        isPlaying
        interval={5000}
      >
        <Slider>
          {REVIEW_ITEM.map((review, index) => (
            <Slide index={0} key={index}>
              <Container maxWidth="md">
                <Box>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography sx={{ fontSize: "16px", paddingY: "8px" }}>
                        {review.review}
                      </Typography>
                      <Box sx={{ marginTop: "10px" }}>
                        <Typography sx={{ fontSize: "18px" }}>
                          {review.name}
                        </Typography>
                        <Typography>
                          {[...Array(5)].map((_, index) => (
                            <StarIcon key={index} sx={{ color: "yellow" }} />
                          ))}
                        </Typography>
                        <Typography sx={{ fontWeight: 600, fontSize: "14px" }}>
                          {review.intro}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Container>
            </Slide>
          ))}
        </Slider>
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
              marginBottom: "20px",
            }}
          />
        </Box>
      </CarouselProvider>
    </Container>
  );
}
