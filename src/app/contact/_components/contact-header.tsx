import React from "react";
import { Box, Typography } from "@mui/joy";
import Image from "next/image";
import londonImage from "../../../images/london-view.jpg";

export default function ContactHeader() {
  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <Image
        src={londonImage}
        alt="LondonViews"
        sizes="100vw"
        fill
        loading="lazy"
        placeholder="blur"
        style={{ objectFit: "cover" }}
      />

      <Box
        sx={{
          height: "100%",
          position: "relative",
          pt: 10,
          pb: 10,
          "&::before": {
            content: '""',
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            backgroundColor: "black",
            opacity: 0.7,
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography
            sx={{ fontSize: 30, color: "white", opacity: 0.9, fontWeight: 600 }}
          >
            Contact Us
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
