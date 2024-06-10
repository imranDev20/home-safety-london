import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { Fragment } from "react";
import { ComponentUseStateProps } from "@/types/misc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutAccount } from "@/services/account.services";
import { useSnackbar } from "@/app/_components/snackbar-provider";
import { useRouter } from "next/navigation";

const LogoutAlertDialog: React.FC<ComponentUseStateProps> = ({
  state: open,
  setOpen,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    mutateAsync: logoutAccountMutate,
    isPending: isLogoutAccountPending,
  } = useMutation({
    mutationFn: async () => {
      const response = await logoutAccount();
      return response;
    },
    onSuccess: (response) => {
      enqueueSnackbar(response?.message, "success");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setOpen(false);
      router.replace("/login");
    },

    onError: (error) => {
      enqueueSnackbar(error?.message, "error");
    },
  });

  const handleLogoutAccount = async () => {
    await logoutAccountMutate();
  };

  return (
    <Fragment>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          variant="outlined"
          role="alertdialog"
          sx={{
            width: "100%",
            maxWidth: {
              xs: 400,
              md: 500,
            },
          }}
        >
          <DialogTitle>
            <WarningRoundedIcon />
            Confirmation
          </DialogTitle>
          <Divider />
          <DialogContent>Are you sure you want to log out?</DialogContent>
          <DialogActions>
            <Button
              variant="solid"
              color="danger"
              loading={isLogoutAccountPending}
              onClick={handleLogoutAccount}
            >
              Confirm Logout
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </Fragment>
  );
};

export default LogoutAlertDialog;
