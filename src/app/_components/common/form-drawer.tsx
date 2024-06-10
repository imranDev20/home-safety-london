import * as React from "react";
import Box from "@mui/joy/Box";
import Drawer from "@mui/joy/Drawer";
import Button from "@mui/joy/Button";
import List from "@mui/joy/List";
import Divider from "@mui/joy/Divider";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import { ComponentUseStateProps } from "@/types/misc";
import { ModalClose } from "@mui/joy";

type FormDrawerProps = ComponentUseStateProps & {
  children: React.ReactNode;
};

export default function FormDrawer({
  state: open,
  setOpen,
  children,
}: FormDrawerProps) {
  return (
    <React.Fragment>
      <Drawer
        open={open}
        anchor="right"
        onClose={() => setOpen(false)}
        size="md"
        sx={{
          "--Drawer-transitionDuration": open ? "0.4s" : "0.2s",
          "--Drawer-transitionFunction": open
            ? "cubic-bezier(0.79,0.14,0.15,0.86)"
            : "cubic-bezier(0.77,0,0.18,1)",
        }}
      >
        <ModalClose />
        <Box role="presentation" sx={{ p: 2 }}>
          {children}
        </Box>
      </Drawer>
    </React.Fragment>
  );
}
