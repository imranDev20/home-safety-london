import { CarouselProvider, Slide, Slider } from "pure-react-carousel";
import React, { useEffect, useState } from "react";
import TestimonialCard from "./testimonial-card";
import { GetTestimonialsResponse } from "@/types/response";
import { getTestimonials } from "@/services/testimonial.services";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress, Grid, Skeleton } from "@mui/joy";

export default function TestimonialSlider() {
  const [slidesToShow, setSlidesToShow] = useState<number>(3);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 600) {
        setSlidesToShow(1);
      } else if (window.innerWidth <= 960) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(2);
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { data: testimonialData, isPending: isGetTestimonialsPending } =
    useQuery<GetTestimonialsResponse>({
      queryKey: ["testimonials"],
      queryFn: () => getTestimonials(),
    });

  if (isGetTestimonialsPending) {
    return (
      <Grid
        container
        spacing={4}
        sx={{
          px: 2,
        }}
      >
        {[0, 1].map((item) => (
          <Grid xs={6} key={item}>
            <Skeleton
              variant="rectangular"
              sx={{
                width: "100%",
                height: "298px",
                borderRadius: "xl",
              }}
            />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (!testimonialData) {
    return "Testimonials not found...";
  }

  return (
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
        {testimonialData?.data?.map((slide, index) => (
          <Slide index={index} key={index}>
            <TestimonialCard slide={slide} />
          </Slide>
        ))}
      </Slider>
    </CarouselProvider>
  );
}
