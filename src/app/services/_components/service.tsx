import React from "react";
import Image from "next/image";
import { Box, Button, Card, Typography } from "@mui/joy";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { GasSafteyIcon } from "@/app/_components/common/icons";

export default function Service({ service }: any) {
  return (
    <Box sx={{ mb: 2 }}>
      <Image
        src={service.serviceImage}
        objectFit="cover"
        alt="serviceImage"
        style={{ width: "100%", height: "100%" }}
      />

      <Card variant="soft" sx={{ borderRadius: 0, mt: -10, ml: 5, p: 3 }}>
        <GasSafteyIcon sx={{ fontSize: 50 }} />
        <Box>
          <Typography level="h3" component="h3">
            {service.ServiceName}
          </Typography>
          <Typography color="neutral" sx={{ my: 2 }}>
            {service.serviceDetail.slice(0, 90)}...
          </Typography>
        </Box>

        <Button
          variant="outlined"
          color="primary"
          endDecorator={<ArrowCircleRightIcon />}
          sx={{
            px: 2,
            display: "flex",
            alignItems: "center",
            borderRadius: 50,
          }}
        >
          Learn More
        </Button>
      </Card>
    </Box>
  );
}
