"use client";
import Box from "@mui/joy/Box";
import {
  Avatar,
  Dropdown,
  ListDivider,
  Menu,
  MenuButton,
  MenuItem,
  Typography,
} from "@mui/joy";

import {
  HelpRounded,
  LogoutRounded,
  SettingsRounded,
} from "@mui/icons-material";

export default function NavbarDropdown() {
  return (
    <>
      <Dropdown>
        <MenuButton
          variant="plain"
          size="sm"
          sx={{
            maxWidth: "32px",
            maxHeight: "32px",
            borderRadius: "9999999px",
          }}
        >
          <Avatar
            src="https://i.pravatar.cc/40?img=2"
            srcSet="https://i.pravatar.cc/80?img=2"
            sx={{ maxWidth: "32px", maxHeight: "32px" }}
          />
        </MenuButton>
        <Menu
          placement="bottom-end"
          size="sm"
          sx={{
            zIndex: "99999",
            p: 1,
            gap: 1,
            "--ListItem-radius": "var(--joy-radius-sm)",
          }}
        >
          <MenuItem>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Avatar
                src="https://i.pravatar.cc/40?img=2"
                srcSet="https://i.pravatar.cc/80?img=2"
                sx={{ borderRadius: "50%" }}
              />
              <Box sx={{ ml: 1.5 }}>
                <Typography level="title-sm" textColor="text.primary">
                  Rick Sanchez
                </Typography>
                <Typography level="body-xs" textColor="text.tertiary">
                  rick@email.com
                </Typography>
              </Box>
            </Box>
          </MenuItem>
          <ListDivider />
          <MenuItem>
            <HelpRounded />
            Help
          </MenuItem>
          <MenuItem>
            <SettingsRounded />
            Settings
          </MenuItem>
          <ListDivider />

          <MenuItem>
            <LogoutRounded />
            Log out
          </MenuItem>
        </Menu>
      </Dropdown>
    </>
  );
}
