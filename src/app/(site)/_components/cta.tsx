"use client";
import { Box, Button, Stack, Typography } from "@mui/joy";
import { useTheme } from "@mui/joy/styles";
import Link from "next/link";
import { hexToRgba, toTitleCase } from "@/shared/functions";
import Image from "next/image";
import backgroundImage from "@/images/about-bg.jpeg";

export default function Cta() {
  const theme = useTheme();

  return (
    <Box component="section" sx={{ position: "relative", my: 10 }}>
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
            {toTitleCase(
              "Simply Click To Get A To Z Repair & Maintenance Work"
            )}
          </Typography>
          <Typography
            level="body-lg"
            sx={{
              color: "white",
            }}
          >
            London Home Safety collaborates with vetted professionals who are
            registered with official UK bodies. Our tradespeople are highly
            skilled and experienced in their respective fields. We value
            customer feedback to ensure the best hassle-free experience for you.
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
