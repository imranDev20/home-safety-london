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
} from "@mui/joy";

import {
  HelpRounded,
  LogoutRounded,
  SettingsRounded,
} from "@mui/icons-material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutAccount } from "@/services/account.services";
import { useSnackbar } from "../../snackbar-provider";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "../../hooks/use-current-user";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/response";

export default function NavbarDropdown() {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { userData } = useCurrentUser();

  const {
    mutateAsync: logoutAccountMutate,
    isPending: isLogoutAccountLoading,
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
        {isLogoutAccountLoading ? (
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
              src="https://i.pravatar.cc/40?img=2"
              srcSet="https://i.pravatar.cc/80?img=2"
              sx={{ maxWidth: "40px", maxHeight: "40px" }}
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
              }}
            >
              <Avatar
                src="https://i.pravatar.cc/40?img=2"
                srcSet="https://i.pravatar.cc/80?img=2"
                sx={{ borderRadius: "50%" }}
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
          <MenuItem>
            <HelpRounded />
            Help
          </MenuItem>
          <MenuItem>
            <SettingsRounded />
            Settings
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
