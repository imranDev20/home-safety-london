"use client";
import * as React from "react";
import { Popper } from "@mui/base/Popper";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import {
  Button,
  Container,
  ListItemDecorator,
  Stack,
  Typography,
  useTheme,
} from "@mui/joy";

import {
  Email,
  HomeRounded,
  Login,
  Person,
  Phone,
  WhatsApp,
} from "@mui/icons-material";
import { CATEGORIES } from "@/shared/constants";
import Link from "next/link";
import { customSlugify } from "@/shared/functions";

type Options = {
  initialActiveIndex: null | number;
  vertical: boolean;
  handlers?: {
    onKeyDown: (
      event: React.KeyboardEvent<HTMLAnchorElement>,
      fns: {
        setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
      }
    ) => void;
  };
};

const useRovingIndex = (options?: Options) => {
  const {
    initialActiveIndex = 0,
    vertical = false,
    handlers = {
      onKeyDown: () => {},
    },
  } = options || {};
  const [activeIndex, setActiveIndex] = React.useState<number | null>(
    initialActiveIndex!
  );
  const targetRefs = React.useRef<Array<HTMLAnchorElement>>([]);
  const targets = targetRefs.current;
  const focusNext = () => {
    let newIndex = activeIndex! + 1;
    if (newIndex >= targets.length) {
      newIndex = 0;
    }
    targets[newIndex]?.focus();
    setActiveIndex(newIndex);
  };
  const focusPrevious = () => {
    let newIndex = activeIndex! - 1;
    if (newIndex < 0) {
      newIndex = targets.length - 1;
    }
    targets[newIndex]?.focus();
    setActiveIndex(newIndex);
  };
  const getTargetProps = (index: number) => ({
    ref: (ref: HTMLAnchorElement) => {
      if (ref) {
        targets[index] = ref;
      }
    },
    tabIndex: activeIndex === index ? 0 : -1,
    onKeyDown: (e: React.KeyboardEvent<HTMLAnchorElement>) => {
      if (Number.isInteger(activeIndex)) {
        if (e.key === (vertical ? "ArrowDown" : "ArrowRight")) {
          focusNext();
        }
        if (e.key === (vertical ? "ArrowUp" : "ArrowLeft")) {
          focusPrevious();
        }
        handlers.onKeyDown?.(e, { setActiveIndex });
      }
    },
    onClick: () => {
      setActiveIndex(index);
    },
  });
  return {
    activeIndex,
    setActiveIndex,
    targets,
    getTargetProps,
    focusNext,
    focusPrevious,
  };
};

type ServicesMenuProps = {
  focusNext: () => void;
  focusPrevious: () => void;
  onMouseEnter?: (
    event?: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLAnchorElement>) => void;
};

const ServicesMenu = React.forwardRef(
  (
    { focusNext, focusPrevious, ...props }: ServicesMenuProps,
    ref: React.ForwardedRef<HTMLAnchorElement>
  ) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLAnchorElement | null>(
      null
    );
    const { targets, setActiveIndex, getTargetProps } = useRovingIndex({
      initialActiveIndex: null,
      vertical: true,
      handlers: {
        onKeyDown: (event, fns) => {
          if (event.key.match(/(ArrowDown|ArrowUp|ArrowLeft|ArrowRight)/)) {
            event.preventDefault();
          }
          if (event.key === "Tab") {
            setAnchorEl(null);
            fns.setActiveIndex(null);
          }
          if (event.key === "ArrowLeft") {
            setAnchorEl(null);
            focusPrevious();
          }
          if (event.key === "ArrowRight") {
            setAnchorEl(null);
            focusNext();
          }
        },
      },
    });

    const open = Boolean(anchorEl);
    const id = open ? "about-popper" : undefined;
    return (
      <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
        <div onMouseLeave={() => setAnchorEl(null)}>
          <ListItemButton
            aria-haspopup
            aria-expanded={open ? "true" : "false"}
            ref={ref}
            {...props}
            role="menuitem"
            onKeyDown={(event) => {
              props.onKeyDown?.(event);
              if (event.key.match(/(ArrowLeft|ArrowRight|Tab)/)) {
                setAnchorEl(null);
              }
              if (event.key === "ArrowDown") {
                event.preventDefault();
                targets[0]?.focus();
                setActiveIndex(0);
              }
            }}
            onFocus={(event) => setAnchorEl(event.currentTarget)}
            onMouseEnter={(event) => {
              props.onMouseEnter?.(event);
              setAnchorEl(event.currentTarget);
            }}
            sx={(theme) => ({
              ...(open && theme.variants.plainHover.neutral),
              fontWeight: 600,
            })}
            component={Link}
            href="/services"
          >
            Services <KeyboardArrowDown />
          </ListItemButton>
          <Popper
            id={id}
            open={open}
            anchorEl={anchorEl}
            disablePortal
            keepMounted
          >
            <List
              role="menu"
              aria-label="About"
              variant="outlined"
              sx={{
                my: 2,
                backgroundColor: "white",
                boxShadow: "md",
                borderRadius: "sm",
                minWidth: 180,
                "--List-radius": "8px",
                "--List-padding": "4px",
                "--ListDivider-gap": "4px",
                "--ListItemDecorator-size": "32px",
              }}
            >
              {CATEGORIES.map((category) => (
                <ListItem role="none" key={category.name}>
                  <ListItemButton
                    role="menuitem"
                    {...getTargetProps(0)}
                    sx={{
                      fontWeight: 600,
                    }}
                    component={Link}
                    href={`/services/${customSlugify(category.name)}`}
                  >
                    {category.name}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Popper>
        </div>
      </ClickAwayListener>
    );
  }
);

ServicesMenu.displayName = "ServicesMenu";

export default function Header() {
  const { targets, getTargetProps, setActiveIndex, focusNext, focusPrevious } =
    useRovingIndex();

  const theme = useTheme();

  return (
    <Box
      component="header"
      sx={{
        zIndex: 10,
        position: "relative",
      }}
    >
      <Box
        sx={{
          py: 1.5,
          backgroundColor: "rgba(0,137,123,0.2)",
        }}
      >
        <Container
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Stack spacing={5} direction="row">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <WhatsApp
                color="secondary"
                sx={{
                  mr: 1,
                  fontWeight: 30,
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
                color="secondary"
                sx={{
                  mr: 1,
                  fontWeight: 30,
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
                color="secondary"
                sx={{
                  mr: 1,
                  fontWeight: 30,
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

      <Container
        sx={{
          zIndex: 100000,
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            py: 2,
            alignItems: "center",
          }}
        >
          <Box>
            <Typography level="h4">Home Safety London</Typography>
          </Box>

          <List
            role="menubar"
            orientation="horizontal"
            sx={{
              "--List-radius": "8px",
              "--List-padding": "4px",
              "--List-gap": "8px",
              "--ListItem-gap": "0px",
              justifyContent: "flex-end",
              mr: 4,
            }}
          >
            <ListItem role="none">
              <ListItemButton
                component={Link}
                role="menuitem"
                {...getTargetProps(0)}
                href="/"
                sx={{
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                <ListItemDecorator>
                  <HomeRounded />
                </ListItemDecorator>
                Home
              </ListItemButton>
            </ListItem>

            <ListItem role="none">
              <ListItemButton
                role="menuitem"
                {...getTargetProps(0)}
                component={Link}
                href="/about"
                sx={{
                  fontWeight: 600,
                }}
              >
                About
              </ListItemButton>
            </ListItem>
            <ListItem role="none">
              <ServicesMenu
                onMouseEnter={() => {
                  setActiveIndex(1);
                  targets[1].focus();
                }}
                focusNext={focusNext}
                focusPrevious={focusPrevious}
                {...getTargetProps(1)}
              />
            </ListItem>

            <ListItem role="none">
              <ListItemButton
                role="menuitem"
                {...getTargetProps(0)}
                component={Link}
                href="/contact"
                sx={{
                  fontWeight: 600,
                }}
              >
                Contact
              </ListItemButton>
            </ListItem>
          </List>
          <Button startDecorator={<Login />} component={Link} href="/login">
            Login
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
