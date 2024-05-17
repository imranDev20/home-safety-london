"use client";
import { Popper } from "@mui/base/Popper";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import {
  Avatar,
  Button,
  Container,
  Divider,
  Drawer,
  Dropdown,
  IconButton,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
  ModalClose,
  Typography,
  useTheme,
} from "@mui/joy";

import {
  History,
  HomeRounded,
  Login,
  Logout,
  Person,
  Settings,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { customSlugify } from "@/shared/functions";
import { SERVICES, SITE_OPTIONS } from "@/shared/constants";
import {
  Dispatch,
  SetStateAction,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import Topbar from "./topbar";
import { usePathname } from "next/navigation";

type Options = {
  initialActiveIndex?: number | null;
  vertical?: boolean;
  handlers?: {
    onKeyDown: (
      event: React.KeyboardEvent<HTMLAnchorElement>,
      fns: {
        setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
      }
    ) => void;
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

const useRovingIndex = (options?: Options) => {
  const {
    initialActiveIndex = 0,
    vertical = false,
    handlers = {
      onKeyDown: () => {},
    },
  } = options || {};
  const [activeIndex, setActiveIndex] = useState<number | null>(
    initialActiveIndex
  );
  const targetRefs = useRef<Array<HTMLAnchorElement>>([]);
  const targets = targetRefs.current;
  const focusNext = () => {
    let newIndex = (activeIndex ?? 0) + 1;
    if (newIndex >= targets.length) newIndex = 0;
    targets[newIndex]?.focus();
    setActiveIndex(newIndex);
  };
  const focusPrevious = () => {
    let newIndex = (activeIndex ?? 0) - 1;
    if (newIndex < 0) newIndex = targets.length - 1;
    targets[newIndex]?.focus();
    setActiveIndex(newIndex);
  };
  const getTargetProps = (index: number) => ({
    ref: (ref: HTMLAnchorElement) => {
      if (ref) targets[index] = ref;
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
    onClick: () => setActiveIndex(index),
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

const ServicesMenu = forwardRef(
  (
    { focusNext, focusPrevious, ...props }: ServicesMenuProps,
    ref: React.ForwardedRef<HTMLAnchorElement>
  ) => {
    const [anchorEl, setAnchorEl] = useState<HTMLAnchorElement | null>(null);
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
              {SERVICES.map((service, index) => (
                <ListItem role="none" key={service.title}>
                  <ListItemButton
                    role="menuitem"
                    {...getTargetProps(index)}
                    sx={{
                      fontWeight: 600,
                    }}
                    component={Link}
                    href={`/services/${customSlugify(service.title)}`}
                  >
                    {service.title}
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

function MobileNavList() {
  const pathname = usePathname();
  const theme = useTheme();

  return (
    <List size="md">
      {SITE_OPTIONS.filter((val) => val.isShowInHeader).map((option) => (
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
  );
}

function Navbar({
  setOpenMobileDrawer,
}: {
  setOpenMobileDrawer: Dispatch<SetStateAction<boolean>>;
}) {
  const { targets, getTargetProps, setActiveIndex, focusNext, focusPrevious } =
    useRovingIndex();

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
          <Typography level="h4">Home Safety London</Typography>
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
                mr: 4,
                display: { xs: "none", md: "flex" },
              }}
            >
              <ListItem role="none">
                <ListItemButton
                  component={Link}
                  role="menuitem"
                  {...getTargetProps(0)}
                  href="/"
                  sx={{ textDecoration: "none", fontWeight: 600 }}
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
                  {...getTargetProps(1)}
                  component={Link}
                  href="/about"
                  sx={{ fontWeight: 600 }}
                >
                  About
                </ListItemButton>
              </ListItem>
              <ListItem role="none">
                <ServicesMenu
                  onMouseEnter={() => {
                    setActiveIndex(2);
                    targets[2].focus();
                  }}
                  focusNext={focusNext}
                  focusPrevious={focusPrevious}
                  {...getTargetProps(2)}
                />
              </ListItem>
              <ListItem role="none">
                <ListItemButton
                  role="menuitem"
                  {...getTargetProps(3)}
                  component={Link}
                  href="/contact"
                  sx={{ fontWeight: 600 }}
                >
                  Contact
                </ListItemButton>
              </ListItem>
            </List>
            <Button
              sx={{ display: { xs: "none", md: "flex" } }}
              startDecorator={<Login />}
              component={Link}
              href="/login"
            >
              Login
            </Button>

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

export default function Header() {
  const [openMobileDrawer, setOpenMobileDrawer] = useState<boolean>(false);
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos && currentScrollPos > 400);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <>
      <Topbar />
      <Drawer
        open={openMobileDrawer}
        onClose={() => setOpenMobileDrawer(false)}
        size="md"
      >
        <Box
          sx={{
            display: "flex",
            p: 2,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography level="h4">Home Safety London</Typography>
          <ModalClose id="close-icon" sx={{ position: "initial" }} />
        </Box>
        <Divider />

        <Box
          sx={{
            p: 2,
          }}
        >
          <MobileNavList />
        </Box>
      </Drawer>

      <Navbar setOpenMobileDrawer={setOpenMobileDrawer} />

      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          backgroundColor: "#fff",
          transition: "top 0.3s ease-in-out",
          zIndex: 100,
          boxShadow: "md",
          ...(visible ? {} : { top: "-100%" }),
        }}
      >
        <Navbar setOpenMobileDrawer={setOpenMobileDrawer} />
      </Box>
    </>
  );
}
