import { Email, Phone, WhatsApp } from "@mui/icons-material";
import { Box, Container, Stack, Typography, useTheme } from "@mui/joy";
import React from "react";

const Topbar = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: {
          xs: "none",
          md: "block",
        },
        py: 1.5,
        backgroundColor: "rgba(0,137,123,0.2)",
      }}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: { xs: "flex-start", sm: "center", lg: "flex-end" },
        }}
      >
        <Stack
          sx={{
            display: "flex",
            gap: 4,
            flexDirection: { xs: "column", sm: "row", md: "row" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <WhatsApp
              sx={{
                mr: 1,
                fontWeight: 30,
                color: theme.palette.secondary[500],
              }}
            />
            <Typography
              level="body-md"
              sx={{
                fontWeight: 600,
              }}
            >
              07480 062995
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Phone
              sx={{
                mr: 1,
                fontWeight: 30,
                color: theme.palette.secondary[500],
              }}
            />
            <Typography
              level="body-md"
              sx={{
                fontWeight: 600,
              }}
            >
              0191 743 1448
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Email
              sx={{
                mr: 1,
                fontWeight: 30,
                color: theme.palette.secondary[500],
              }}
            />
            <Typography
              level="body-md"
              sx={{
                fontWeight: 600,
              }}
            >
              info@homesafetylondon.co.uk
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Topbar;
