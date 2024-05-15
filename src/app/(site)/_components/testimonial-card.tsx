import React, { useState } from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/joy";
import StarIcon from "@mui/icons-material/Star";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { CSSTransition } from "react-transition-group";

const TRUNCATE_LENGTH = 300;

interface TestimonialCardProps {
  slide: any; // Replace with the appropriate type for slide data
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ slide }) => {
  const [showFullContent, setShowFullContent] = useState(false);
  const truncatedContent =
    slide.content.length > TRUNCATE_LENGTH
      ? `${slide.content.slice(0, TRUNCATE_LENGTH)}...`
      : slide.content;

  const toggleShowFullContent = () => {
    setShowFullContent((prevState) => !prevState);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mx: 2,
      }}
    >
      <Card variant="plain" sx={{ width: "100%" }}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <FormatQuoteIcon color="primary" sx={{ fontSize: 40 }} />
          <Typography level="title-lg" component="h4" sx={{ my: 2 }}>
            {slide.subject}
          </Typography>

          <Typography color="neutral" sx={{ my: 2, textAlign: "center" }}>
            {showFullContent ? slide.content : truncatedContent}{" "}
            {slide.content.length > TRUNCATE_LENGTH && (
              <Button
                sx={{
                  display: "inline-block",
                }}
                variant="plain"
                color="neutral"
                onClick={toggleShowFullContent}
              >
                {showFullContent ? "Read Less" : "Read More"}
              </Button>
            )}
          </Typography>

          <Box>
            {[...Array(slide.rating)].map((_, index) => (
              <StarIcon key={index} sx={{ color: "#ECBD41" }} />
            ))}
            {[...Array(5 - slide.rating)].map((_, index) => (
              <StarIcon key={index} sx={{ color: "#DBDBDB" }} />
            ))}
          </Box>
          <Typography level="title-md">{slide.name}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TestimonialCard;
