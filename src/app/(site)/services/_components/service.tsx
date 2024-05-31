"use client";
import Image from "next/image";
import { Box, Button, Card, Typography, useTheme } from "@mui/joy";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import Link from "next/link";
import { customSlugify } from "@/shared/functions";

export default function Service({ service }: any) {
  const theme = useTheme();
  const { description } = service;
  const trimDeccription =
    description.length > 100 ? `${description.slice(0, 100)}...` : description;

  return (
    <Box sx={{ mb: 2 }}>
      <Image
        src={service.image}
        objectFit="cover"
        alt="serviceImage"
        style={{ width: "100%", height: "100%", borderRadius: 10 }}
      />

      <Card
        variant="plain"
        sx={{
          mt: -10,
          ml: 2,
          mr: 2,
          p: 3,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          backgroundColor: theme.palette.background.level3,
          boxShadow: "xl",
          borderRadius: "lg",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <service.Icon sx={{ fontSize: 50 }} color="primary" />
        </Box>
        <Box sx={{ height: "100%" }}>
          <Typography
            level="h3"
            component="h3"
            sx={{
              textAlign: "center",
            }}
          >
            {service.name}
          </Typography>
          <Typography
            color="neutral"
            sx={{
              my: 2,
              overflow: "hidden",
              textAlign: "center",
            }}
          >
            {trimDeccription}
          </Typography>
        </Box>

        <Button
          variant="solid"
          color="primary"
          component={Link}
          href={`/services/${customSlugify(service.parentService)}${
            service.route
          }`}
          // endDecorator={<ArrowCircleRightIcon />}
          sx={{
            px: 2,
            display: "flex",
            alignItems: "center",
            ":hover": {
              backgroundColor: theme.palette.secondary[500],
              color: theme.palette.text.primary,
            },
          }}
        >
          Learn More
        </Button>
      </Card>
    </Box>
  );
}
