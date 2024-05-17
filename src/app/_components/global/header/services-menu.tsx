import { forwardRef, useState } from "react";
import useRovingIndex from "../../hooks/use-roving-index";
import { usePathname } from "next/navigation";
import { List, ListItem, ListItemButton, useTheme } from "@mui/joy";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import { KeyboardArrowDown } from "@mui/icons-material";
import { Popper } from "@mui/base/Popper";
import Link from "next/link";
import { SERVICES } from "@/shared/constants";
import { customSlugify } from "@/shared/functions";

type ServicesMenuProps = {
  focusNext: () => void;
  focusPrevious: () => void;
  onMouseEnter?: (
    event?: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLAnchorElement>) => void;
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

    const pathname = usePathname();
    const theme = useTheme();

    const open = Boolean(anchorEl);
    const id = open ? "about-popper" : undefined;

    return (
      <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
        <div onMouseLeave={() => setAnchorEl(null)}>
          <ListItemButton
            aria-haspopup
            variant="plain"
            aria-expanded={open ? "true" : "false"}
            ref={ref}
            {...props}
            role="menuitem"
            selected={pathname.includes("/services")}
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
              "--variant-plainActiveBg": theme.palette.secondary[100],
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

export default ServicesMenu;
