"use client";
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import {
  Button,
  Container,
  IconButton,
  ListItemDecorator,
  Stack,
  Typography,
  useTheme,
} from "@mui/joy";

import { East, HomeRounded, Login } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { usePathname } from "next/navigation";
import useRovingIndex from "../../hooks/use-roving-index";
import ServicesMenu from "./services-menu";
import NavbarDropdown from "./navbar-dropdown";

const NAV_ITEMS = [
  { label: "Home", path: "/", icon: <HomeRounded /> },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Contact", path: "/contact" },
];

export default function MyNavbar({
  setOpenMobileDrawer,
  isInverted,
}: {
  setOpenMobileDrawer: Dispatch<SetStateAction<boolean>>;
  isInverted?: boolean;
}) {
  const { targets, getTargetProps, setActiveIndex, focusNext, focusPrevious } =
    useRovingIndex();
  const theme = useTheme();
  const pathname = usePathname();
  const isLoggedIn = false;

  return (
    <Box component="header" sx={{ zIndex: 10, position: "relative" }}>
      <Container sx={{ zIndex: 100000, position: "relative" }}>
        <Box
          sx={{
            display: "flex",
            py: 2,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            level="h4"
            sx={{
              color: "white",
            }}
          >
            LHS
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <List
              role="menubar"
              orientation="horizontal"
              sx={{
                "--List-radius": "8px",
                "--List-padding": "4px",
                "--List-gap": "8px",
                "--ListItem-gap": "0px",
                justifyContent: "flex-end",
                mr: 6,
                display: { xs: "none", md: "flex" },
              }}
            >
              {NAV_ITEMS.map(({ label, path, icon }, index) => (
                <ListItem key={path} role="none">
                  {path === "/services" ? (
                    <ServicesMenu
                      isInverted={isInverted}
                      onMouseEnter={() => {
                        setActiveIndex(index);
                        targets[index].focus();
                      }}
                      focusNext={focusNext}
                      focusPrevious={focusPrevious}
                      {...getTargetProps(index)}
                    />
                  ) : (
                    <ListItemButton
                      variant="plain"
                      role="menuitem"
                      sx={{
                        textDecoration: "none",
                        fontWeight: 600,
                        color: isInverted
                          ? "white"
                          : theme.palette.text.primary,
                        ...(isInverted
                          ? {
                              "--variant-plainActiveBg": "transparent",
                              "--variant-plainHoverBg": "transparent",

                              "--variant-plainHoverColor":
                                theme.palette.secondary[500],

                              "--variant-plainActiveColor":
                                theme.palette.secondary[500],
                            }
                          : {}),
                      }}
                      {...getTargetProps(index)}
                      href={path}
                      selected={pathname === path}
                      component={Link}
                    >
                      {icon && <ListItemDecorator>{icon}</ListItemDecorator>}
                      {label}
                    </ListItemButton>
                  )}
                </ListItem>
              ))}
            </List>

            <Stack
              spacing={3}
              direction="row"
              sx={{
                mr: {
                  xs: 3,
                  md: 0,
                },
              }}
            >
              {isLoggedIn ? (
                <NavbarDropdown />
              ) : (
                <Button
                  variant="solid"
                  color="primary"
                  startDecorator={<Login />}
                  component={Link}
                  href="/login"
                  sx={{
                    display: {
                      xs: "none",
                      md: "flex",
                    },
                  }}
                >
                  Login
                </Button>
              )}

              <Button
                component={Link}
                href="/book-now"
                color="secondary"
                size="lg"
                sx={{
                  mr: {
                    xs: 3,
                    md: 0,
                  },
                }}
                endDecorator={<East fontSize="md" />}
              >
                Book Now
              </Button>
            </Stack>

            <IconButton
              variant="outlined"
              sx={{ display: { xs: "flex", md: "none" } }}
              onClick={() => setOpenMobileDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
