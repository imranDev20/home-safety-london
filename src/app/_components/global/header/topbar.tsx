import {
  Email,
  Facebook,
  Instagram,
  Login,
  Phone,
  Twitter,
  WhatsApp,
  X,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/joy";
import Link from "next/link";
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

        backgroundColor: theme.palette.primary[500],
      }}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Stack
          sx={{
            gap: 4,
          }}
          direction="row"
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              py: 1.5,
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
                color: "white",
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
                color: "white",
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
                color: "white",
              }}
            >
              info@homesafetylondon.co.uk
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" alignItems="center" gap={5}>
          <Stack direction="row" alignItems="center" gap={1}>
            <Facebook
              sx={{
                color: theme.palette.secondary[500],
              }}
            />
            <Instagram
              sx={{
                color: theme.palette.secondary[500],
              }}
            />
            <X
              fontSize="xl"
              sx={{
                color: theme.palette.secondary[500],
              }}
            />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Topbar;
