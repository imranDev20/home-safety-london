import { Box, Button, Sheet, Typography } from "@mui/joy";
import React from "react";

interface ServiceProps {
  service: {
    id: number;
    ServiceName: string;
    serviceDetail: string;
  };
}

export default function Service({ service }: ServiceProps) {
  return (
    <Sheet
      variant="outlined"
      sx={{
        borderRadius: "8px",
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
        backgroundColor: "white",
        paddingX: "20px",
        paddingY: "25px",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: "32px" }}>{service.ServiceName}</Typography>
        <Typography
          sx={{ textAlign: "center", paddingY: "15px", fontSize: "16px" }}
        >
          {service.serviceDetail}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-end",
            marginTop: "10px",
          }}
        >
          <Button
            variant="solid"
            sx={{ padding: "10px 25px", fontSize: "16px", borderRadius: "2px" }}
          >
            Find Out More
          </Button>
        </Box>
      </Box>
    </Sheet>
  );
}
