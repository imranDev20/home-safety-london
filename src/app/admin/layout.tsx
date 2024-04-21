"use client";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemButton,
  ListItemDecorator,
  ModalClose,
  Stack,
  Typography,
  useTheme,
} from "@mui/joy";
import Sheet from "@mui/joy/Sheet";
import React from "react";
import { Logout, Search } from "@mui/icons-material";
import { ADMIN_OPTIONS } from "@/shared/constants";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Hidden } from "@mui/material";
import Menu from "@mui/icons-material/Menu";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const pathname = usePathname();

  const [open, setOpen] = React.useState(false);

  return (
    <Stack>
      <Hidden mdUp>
        <Sheet
          sx={{
            width: "100%",
            py: 2,
            px: 3,
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          }}
        >
          <IconButton color="neutral" onClick={() => setOpen(true)}>
            <Menu />
          </IconButton>
        </Sheet>
      </Hidden>

      <Drawer open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            ml: "auto",
            mt: 1,
            mr: 2,
          }}
        >
          <IconButton>
            <ModalClose id="close-icon" sx={{ position: "initial" }} />
          </IconButton>
        </Box>
        <Input
          size="sm"
          placeholder="Search"
          variant="plain"
          endDecorator={<Search />}
          slotProps={{
            input: {
              "aria-label": "Search anything",
            },
          }}
          sx={{
            m: 3,
            borderRadius: 0,
            borderBottom: "2px solid",
            borderColor: "neutral.outlinedBorder",
            "&:hover": {
              borderColor: "neutral.outlinedHoverBorder",
            },
            "&::before": {
              border: "1px solid var(--Input-focusedHighlight)",
              transform: "scaleX(0)",
              left: 0,
              right: 0,
              bottom: "-2px",
              top: "unset",
              transition: "transform .15s cubic-bezier(0.1,0.9,0.2,1)",
              borderRadius: 0,
            },
            "&:focus-within::before": {
              transform: "scaleX(1)",
            },
          }}
        />
        <List
          size="lg"
          component="nav"
          sx={{
            flex: "none",
            fontSize: "xl",
            "& > div": { justifyContent: "center" },
          }}
        >
          {ADMIN_OPTIONS.map((option) => (
            <ListItem
              key={option.route}
              sx={{
                mb: 1,
                textDecoration: "none",
              }}
              component={Link}
              href={option.route}
            >
              <ListItemButton
                selected={pathname === option.route}
                sx={{
                  fontWeight: 500,
                  borderRadius: theme.radius.sm,
                }}
              >
                <ListItemDecorator
                  sx={{
                    minInlineSize: "2rem",
                  }}
                >
                  <option.Icon />
                </ListItemDecorator>

                <Typography
                  sx={{
                    fontSize: 14,
                  }}
                >
                  {option.label}
                </Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        sx={{
          display: "flex",
          minHeight: "100dvh",
        }}
      >
        <Hidden mdDown>
          <Sheet
            sx={{
              maxWidth: "240px",
              height: "100dvh",
              p: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              borderRight: "1px solid",
              borderRightColor: theme.palette.divider,
            }}
          >
            <Box>
              <Box
                sx={{
                  display: "flex",
                  mb: 3,
                  gap: 1,
                }}
              >
                <HealthAndSafetyIcon />
                <Typography level="title-lg">Home Safety</Typography>
              </Box>

              <Input
                size="sm"
                startDecorator={<Search />}
                placeholder="Search"
              />
              <List
                size="sm"
                sx={{
                  mt: 2,
                }}
              >
                {ADMIN_OPTIONS.map((option) => (
                  <ListItem
                    key={option.route}
                    sx={{
                      mb: 1,
                      textDecoration: "none",
                    }}
                    component={Link}
                    href={option.route}
                  >
                    <ListItemButton
                      selected={pathname === option.route}
                      sx={{
                        fontWeight: 500,
                        borderRadius: theme.radius.sm,
                      }}
                    >
                      <ListItemDecorator
                        sx={{
                          minInlineSize: "2rem",
                        }}
                      >
                        <option.Icon />
                      </ListItemDecorator>

                      <Typography
                        sx={{
                          fontSize: 14,
                        }}
                      >
                        {option.label}
                      </Typography>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box>
              <Divider
                sx={{
                  my: 2,
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                  }}
                >
                  <Avatar size="sm" />
                  <Box>
                    <Typography level="title-sm">Kamal Ahmed</Typography>
                    <Typography component="span" level="body-xs">
                      kamal@gmail.com
                    </Typography>
                  </Box>
                </Box>

                <IconButton variant="plain" size="sm">
                  <Logout />
                </IconButton>
              </Box>
            </Box>
          </Sheet>
        </Hidden>
        <Box
          sx={{
            flex: 1,
            px: 5,
            py: 2,
          }}
        >
          {children}
        </Box>
      </Box>
    </Stack>
  );
}
