"use client";
import Box from "@mui/joy/Box";
import {
  Avatar,
  CircularProgress,
  Dropdown,
  ListDivider,
  Menu,
  MenuButton,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/joy";

import {
  ListAltRounded,
  LogoutRounded,
  PersonRounded,
} from "@mui/icons-material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutAccount } from "@/services/account.services";
import { useSnackbar } from "../../snackbar-provider";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "../../hooks/use-current-user";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/response";
import Link from "next/link";
import { hexToRgba } from "@/shared/functions";

export default function NavbarDropdown() {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { userData } = useCurrentUser();

  const {
    mutateAsync: logoutAccountMutate,
    isPending: isLogoutAccountPending,
  } = useMutation({
    mutationFn: () => logoutAccount(),

    onSuccess: (response) => {
      enqueueSnackbar(response.message, "success");
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
      queryClient.resetQueries();
      router.replace("/login");
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      enqueueSnackbar(error.response?.data.message || error?.message, "error");
    },
  });

  const handleLogoutAccount = async () => {
    await logoutAccountMutate();
  };

  return (
    <>
      <Dropdown>
        {isLogoutAccountPending ? (
          <CircularProgress thickness={4} size="md" />
        ) : (
          <MenuButton
            variant="plain"
            sx={{
              maxWidth: "40px",
              maxHeight: "40px",
              borderRadius: "9999999px",
            }}
          >
            <Avatar
              sx={{
                borderRadius: "50%",
              }}
            />
          </MenuButton>
        )}

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
                textDecoration: "none",
              }}
              component={Link}
              href="/profile"
            >
              <Avatar
                sx={{
                  borderRadius: "50%",
                  backgroundColor: hexToRgba(theme.palette.primary[500], 0.3),
                }}
              />
              <Box sx={{ ml: 1.5 }}>
                <Typography level="title-sm" textColor="text.primary">
                  {userData?.name}
                </Typography>
                <Typography level="body-xs" textColor="text.tertiary">
                  {userData?.email}
                </Typography>
              </Box>
            </Box>
          </MenuItem>
          <ListDivider />
          <MenuItem component={Link} href="/profile">
            <PersonRounded />
            Profile
          </MenuItem>
          <MenuItem component={Link} href="/profile/orders">
            <ListAltRounded />
            Orders
          </MenuItem>
          <ListDivider />

          <MenuItem onClick={handleLogoutAccount}>
            <LogoutRounded />
            Log out
          </MenuItem>
        </Menu>
      </Dropdown>
    </>
  );
}
