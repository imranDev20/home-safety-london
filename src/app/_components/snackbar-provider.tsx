"use client";
import React, { createContext, useContext, useState } from "react";
import Snackbar from "@mui/joy/Snackbar";
import Button from "@mui/joy/Button";
import PlaylistAddCheckCircleRoundedIcon from "@mui/icons-material/PlaylistAddCheckCircleRounded";

type Variant = "success" | "error" | "warning" | "info";

type SnackbarContextType = {
  enqueueSnackbar: (message: string, variant?: Variant) => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

export const SnackbarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [snackbarQueue, setSnackbarQueue] = useState<
    Array<{ message: string; variant?: Variant }>
  >([]);
  const [open, setOpen] = useState(false);

  const enqueueSnackbar = (message: string, variant?: Variant) => {
    setSnackbarQueue((prevQueue) => [...prevQueue, { message, variant }]);
    setOpen(true); // Open Snackbar when a message is added to the queue
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ enqueueSnackbar }}>
      {children}
      {snackbarQueue.map((item, index) => (
        <Snackbar
          key={index}
          variant="soft"
          color={
            item.variant === "error"
              ? "danger"
              : item.variant === "info"
              ? "neutral"
              : item.variant || "success"
          }
          open={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          startDecorator={<PlaylistAddCheckCircleRoundedIcon />}
          endDecorator={
            <Button
              onClick={handleClose}
              size="sm"
              variant="soft"
              color={
                item.variant === "error"
                  ? "danger"
                  : item.variant === "info"
                  ? "neutral"
                  : item.variant || "success"
              }
            >
              Dismiss
            </Button>
          }
        >
          {item.message}
        </Snackbar>
      ))}
    </SnackbarContext.Provider>
  );
};
