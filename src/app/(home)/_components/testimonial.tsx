import React from "react";
import { Box, Card, CardContent, Container, Sheet, Typography } from "@mui/joy";
import { useTheme } from "@mui/joy/styles";
import StarIcon from "@mui/icons-material/Star";
import { CarouselProvider, Slider, Slide, DotGroup } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

export default function Testimonial() {
  const theme = useTheme();
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
    <Sheet
      variant="soft"
      sx={{
        my: 5,
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
            }}
          >
            What Our Customers Say About Us
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
                        {slides.intro}
                      </Typography>
                      <Typography
                        color="neutral"
                        sx={{
                          my: 2,
                          textAlign: "center",
                        }}
                      >
                        {slides.review}
                      </Typography>

                      <Typography>
                        {[...Array(5)].map((_, index) => (
                          <StarIcon key={index} sx={{ color: "#ECBD41" }} />
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
      </Container>
    </Sheet>
  );
}
