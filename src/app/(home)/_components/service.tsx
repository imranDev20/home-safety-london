import { Box, Button, Card, Sheet, Typography } from "@mui/joy";
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
    <Card variant="outlined">
      <Box sx={{ textAlign: "center" }}>
        <Typography level="h3">{service.ServiceName}</Typography>
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
          <Button variant="solid">Find Out More</Button>
        </Box>
      </Box>
    </Card>
  );
}
