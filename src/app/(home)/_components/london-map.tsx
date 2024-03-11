import React from "react";
import map from "../../../../public/map.png";
import { Box, Typography } from "@mui/joy";
import Image from "next/image";

export default function LondonMap() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingY: "20px",
        marginTop: "20px",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography
          sx={{ fontSize: "32px", fontWeight: 600, paddingBottom: "10px" }}
        >
          Greator London Coverage
        </Typography>
        <Typography sx={{ fontSize: "18px" }}>
          We cover whole London and M25 area.
        </Typography>
      </Box>
      <Box>
        <Image
          src={map}
          alt="map-image"
          style={{ width: "100%", height: "100%" }}
        />
      </Box>
    </Box>
  );
}
