import * as React from "react";
import { Popper } from "@mui/base/Popper";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { Container, Typography } from "@mui/joy";
import Image from "next/image";
import logo from "../../../public/logo.png";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MailIcon from "@mui/icons-material/Mail";

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

type ElectricalServiceMenuProps = {
  focusNext: () => void;
  focusPrevious: () => void;
  onMouseEnter?: (
    event?: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLAnchorElement>) => void;
};

const ElectricalServiceMenu = React.forwardRef(
  (
    { focusNext, focusPrevious, ...props }: ElectricalServiceMenuProps,
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
    const id = open ? "electricalservice-popper" : undefined;
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
            })}
          >
            Electrical Services <KeyboardArrowDown />
          </ListItemButton>
          <Popper
            id={id}
            open={open}
            anchorEl={anchorEl}
            disablePortal
            keepMounted
            style={{ zIndex: "5000" }}
          >
            <List
              role="menu"
              aria-label="About"
              variant="outlined"
              sx={{
                my: 2,
                backgroundColor: "#ffffff",
                boxShadow: "md",
                borderRadius: "sm",
                "--List-radius": "8px",
                "--List-padding": "4px",
                "--ListDivider-gap": "4px",
                "--ListItemDecorator-size": "32px",
              }}
            >
              <ListItem role="none">
                <ListItemButton role="menuitem" {...getTargetProps(0)}>
                  EICR Certificate Cost London
                </ListItemButton>
              </ListItem>
              <ListItem role="none">
                <ListItemButton role="menuitem" {...getTargetProps(1)}>
                  PAT TESTING
                </ListItemButton>
              </ListItem>
            </List>
          </Popper>
        </div>
      </ClickAwayListener>
    );
  }
);
ElectricalServiceMenu.displayName = "ElectricalServiceMenu";

type GasServicesMenuProps = {
  focusNext: () => void;
  focusPrevious: () => void;
  onMouseEnter?: (
    event?: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLAnchorElement>) => void;
};

const GasServicesMenu = React.forwardRef(
  (
    { focusNext, focusPrevious, ...props }: GasServicesMenuProps,
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
    const id = open ? "gasservice-popper" : undefined;
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
            })}
          >
            Gas Services <KeyboardArrowDown />
          </ListItemButton>
          <Popper
            id={id}
            open={open}
            anchorEl={anchorEl}
            disablePortal
            keepMounted
            style={{ zIndex: "5000" }}
          >
            <List
              role="menu"
              aria-label="Gas"
              variant="outlined"
              sx={{
                backgroundColor: "white",
                my: 2,
                boxShadow: "md",
                borderRadius: "sm",
                minWidth: 180,
                "--List-radius": "8px",
                "--List-padding": "4px",
                "--ListDivider-gap": "4px",
              }}
            >
              <ListItem role="none">
                <ListItemButton role="menuitem" {...getTargetProps(1)}>
                  Gas Certificate Cost London
                </ListItemButton>
              </ListItem>
            </List>
          </Popper>
        </div>
      </ClickAwayListener>
    );
  }
);
GasServicesMenu.displayName = "GasServicesMenu";

type FireServiceMenuProps = {
  focusNext: () => void;
  focusPrevious: () => void;
  onMouseEnter?: (
    event?: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLAnchorElement>) => void;
};

const FireServiceMenu = React.forwardRef(
  (
    { focusNext, focusPrevious, ...props }: FireServiceMenuProps,
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
    const id = open ? "fireservice-popper" : undefined;
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
            })}
          >
            Fire Service <KeyboardArrowDown />
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
              aria-label="Fire"
              variant="outlined"
              sx={{
                my: 2,
                boxShadow: "md",
                borderRadius: "sm",
                minWidth: 180,
                "--List-radius": "8px",
                "--List-padding": "4px",
                "--ListDivider-gap": "4px",
              }}
            >
              <ListItem role="none">
                <ListItemButton role="menuitem" {...getTargetProps(1)}>
                  Visit
                </ListItemButton>
              </ListItem>
              <ListItem role="none">
                <ListItemButton role="menuitem" {...getTargetProps(2)}>
                  Photo tour
                </ListItemButton>
              </ListItem>
            </List>
          </Popper>
        </div>
      </ClickAwayListener>
    );
  }
);
FireServiceMenu.displayName = "FireServiceMenu";

type HealthSafetyMenuProps = {
  focusNext: () => void;
  focusPrevious: () => void;
  onMouseEnter?: (
    event?: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLAnchorElement>) => void;
};
const HealthSafetyMenu = React.forwardRef(
  (
    { focusNext, focusPrevious, ...props }: HealthSafetyMenuProps,
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
    const id = open ? "healthsafety-popper" : undefined;
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
            })}
          >
            Health & Safety <KeyboardArrowDown />
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
              aria-label="Health&Safety"
              variant="outlined"
              sx={{
                my: 2,
                boxShadow: "md",
                borderRadius: "sm",
                minWidth: 180,
                "--List-radius": "8px",
                "--List-padding": "4px",
                "--ListDivider-gap": "4px",
              }}
            >
              <ListItem role="none">
                <ListItemButton role="menuitem" {...getTargetProps(1)}>
                  Energy Performance Certificate London
                </ListItemButton>
              </ListItem>
            </List>
          </Popper>
        </div>
      </ClickAwayListener>
    );
  }
);
HealthSafetyMenu.displayName = "HealthSafetyMenu";

export default function Header() {
  const { targets, getTargetProps, setActiveIndex, focusNext, focusPrevious } =
    useRovingIndex();
  return (
    <Box>
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingY: "15px",
          }}
        >
          <Box>
            <Image src={logo} alt="logo-image" />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "18px",
                }}
              >
                <PhoneIcon />
                <Typography
                  component="span"
                  sx={{ fontWeight: 600, marginLeft: "8px" }}
                >
                  0191 743 1448
                </Typography>
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "20px",
                  fontSize: "18px",
                }}
              >
                <WhatsAppIcon />
                <Typography
                  component="span"
                  sx={{ fontWeight: 600, marginLeft: "8px" }}
                >
                  07480 062995
                </Typography>
              </Typography>
            </Box>
            <Typography sx={{ display: "flex", fontSize: "18px" }}>
              <MailIcon />
              <Typography
                component="span"
                sx={{ fontWeight: 600, marginLeft: "8px" }}
              >
                info@londonpropertyinspections.co.uk
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Container>
      <Box sx={{ backgroundColor: "#14a51a" }}>
        <Container sx={{}}>
          <List
            role="menubar"
            orientation="horizontal"
            sx={{
              "--List-radius": "8px",
              "--List-padding": "4px",
              "--List-gap": "8px",
              "--ListItem-gap": "0px",
              dispaly: "flex",
              justifyContent: "center",
              gap: 3,
            }}
          >
            <ListItem role="none">
              <ListItemButton
                role="menuitem"
                {...getTargetProps(0)}
                component="a"
                href="#navigation-menu"
              >
                Home
              </ListItemButton>
            </ListItem>
            <ListItem role="none">
              <ElectricalServiceMenu
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
              <GasServicesMenu
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
              <FireServiceMenu
                onMouseEnter={() => {
                  setActiveIndex(3);
                  targets[2].focus();
                }}
                focusNext={focusNext}
                focusPrevious={focusPrevious}
                {...getTargetProps(3)}
              />
            </ListItem>
            <ListItem role="none">
              <HealthSafetyMenu
                onMouseEnter={() => {
                  setActiveIndex(4);
                  targets[2].focus();
                }}
                focusNext={focusNext}
                focusPrevious={focusPrevious}
                {...getTargetProps(4)}
              />
            </ListItem>
            <ListItem role="none">
              <ListItemButton
                role="menuitem"
                {...getTargetProps(5)}
                component="a"
                href="#navigation-menu"
              >
                Contact
              </ListItemButton>
            </ListItem>
          </List>
        </Container>
      </Box>
    </Box>
  );
}
