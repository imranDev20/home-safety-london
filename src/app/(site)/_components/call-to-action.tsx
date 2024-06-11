"use client";
import { Box, Button, Stack, Typography } from "@mui/joy";
import { useTheme } from "@mui/joy/styles";
import Link from "next/link";
import { hexToRgba, toTitleCase } from "@/shared/functions";
import Image from "next/image";
import backgroundImage from "@/images/about-bg.jpeg";

export default function CallToAction() {
  const theme = useTheme();

  return (
    <Box component="section" sx={{ position: "relative" }}>
      <Image
        src={backgroundImage}
        alt="Background"
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
          py: 15,
          "&::before": {
            content: '""',
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            backgroundColor: hexToRgba(theme.palette.primary[600], 0.8),
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            maxWidth: 900,
            px: 5,
            mx: "auto",
          }}
        >
          <Typography
            level="h2"
            component="h2"
            fontWeight={700}
            sx={{ fontSize: 58, color: "white", mb: 3 }}
          >
            {toTitleCase("Take the First Step Towards Safety")}
          </Typography>
          <Typography
            level="body-lg"
            sx={{
              color: "white",
            }}
          >
            Book your desired service today and experience the peace of mind
            that comes with a safe and secure home. Visit our services page to
            find out more and schedule an appointment.
          </Typography>

          <Stack
            direction="row"
            justifyContent="center"
            spacing={3}
            sx={{
              mt: 5,
            }}
          >
            <Button
              variant="solid"
              href="/book-now/"
              component={Link}
              size="lg"
              sx={{
                backgroundColor: theme.palette.text.primary,
                ":hover": {
                  backgroundColor: theme.palette.secondary[500],
                  color: theme.palette.text.primary,
                },
              }}
            >
              Book Now
            </Button>

            <Button
              variant="solid"
              href="/book-now/"
              component={Link}
              size="lg"
              sx={{
                backgroundColor: "white",
                color: theme.palette.text.primary,
                ":hover": {
                  backgroundColor: theme.palette.secondary[500],
                  color: theme.palette.text.primary,
                },
              }}
            >
              Call Now
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
