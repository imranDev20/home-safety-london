import { customSlugify } from "@/shared/functions";
import { Box, Button, Card, Sheet, Typography } from "@mui/joy";
import Link from "next/link";
import React from "react";

interface ServiceProps {
  service: {
    id: number;
    serviceName: string;
    serviceDetail: string;
  };
}

export default function Service({ service }: ServiceProps) {
  return (
    <Card variant="plain">
      <Box sx={{ textAlign: "center" }}>
        <Typography
          level="h3"
          sx={{
            mb: 2,
          }}
        >
          {service.serviceName}
        </Typography>
        <Typography sx={{ textAlign: "center", mb: 3 }} color="neutral">
          {service.serviceDetail}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <Button
            variant="solid"
            component={Link}
            href={`/services/${customSlugify(service.serviceName)}`}
          >
            Find Out More
          </Button>
        </Box>
      </Box>
    </Card>
  );
}
