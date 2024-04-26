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
import { Inter } from "next/font/google";
import ThemeRegistry from "../_components/theme-registry";
import TopLoader from "../_components/common/top-loader";

const inter = Inter({ subsets: ["latin"] });

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const pathname = usePathname();

  const [open, setOpen] = React.useState(false);

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeRegistry options={{ key: "joy" }}>
          <TopLoader />
          <Stack>
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
                <ModalClose id="close-icon" sx={{ position: "initial" }} />
              </Box>
              <Input
                size="sm"
                startDecorator={<Search />}
                placeholder="Search"
                sx={{ m: 2 }}
              />
              <List size="lg" sx={{ mt: 2, p: 2 }}>
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
            </Drawer>

            <Box
              sx={{
                display: "flex",
                minHeight: "100dvh",
              }}
            >
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
        </ThemeRegistry>
      </body>
    </html>
  );
}
