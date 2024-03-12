import React from "react";
import { Box, Container, Typography } from "@mui/joy";
import { useForm } from "react-hook-form";

export default function ContactForm() {
  const { register, handleSubmit } = useForm();

  return (
    <Container>
      <Box>
        <Typography>Get In Touch</Typography>
        <Typography>
          Our friendly customer service team are ready to help you choose the
          best safety certificate for your needs.
        </Typography>
      </Box>
      <Box></Box>
    </Container>
  );
}
