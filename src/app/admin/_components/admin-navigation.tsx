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
} from "@mui/joy";
import Sheet from "@mui/joy/Sheet";
import React, { ReactNode, Suspense, useState } from "react";
import { Logout, Search } from "@mui/icons-material";
import { ADMIN_OPTIONS } from "@/shared/constants";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Menu from "@mui/icons-material/Menu";
import { theme } from "@/shared/theme";
import LogoutAlertDialog from "./logout-alert-dialog";
import { useCurrentUser } from "@/app/_components/hooks/use-current-user";
import UserProfileSection from "./user-profile-section";

interface AdminNavigationProps {
  children: ReactNode;
}

const NavigationList: React.FC = () => {
  const pathname = usePathname();

  return (
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
  );
};

const AdminNavigation: React.FC<AdminNavigationProps> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);

  return (
    <>
      <Stack>
        <Sheet
          sx={{
            width: "100%",
            py: 2,
            px: 3,
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            display: { xs: "flex", sm: "flex", md: "none" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <HealthAndSafetyIcon />
            <Typography level="title-lg">Home Safety</Typography>
          </Box>
          <IconButton
            variant="outlined"
            color="neutral"
            onClick={() => setOpen(true)}
          >
            <Menu />
          </IconButton>
        </Sheet>

        {/* Mobile & tablet device screens drawer */}
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
          <NavigationList />
          <UserProfileSection setOpenConfirmModal={setOpenConfirmModal} />
        </Drawer>

        <Box
          sx={{
            display: "flex",
            minHeight: "100dvh",
          }}
        >
          {/* dashboard sidebar navigation */}
          <Sheet
            sx={{
              maxWidth: "240px",
              height: "100dvh",
              p: 2,
              display: { xs: "none", sm: "none", md: "flex" },
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
              <NavigationList />
            </Box>

            <UserProfileSection setOpenConfirmModal={setOpenConfirmModal} />
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
      <LogoutAlertDialog
        open={openConfirmModal}
        setOpen={setOpenConfirmModal}
      />
    </>
  );
};

export default AdminNavigation;
