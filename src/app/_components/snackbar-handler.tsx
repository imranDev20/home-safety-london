"use client";
import { useSearchParams } from "next/navigation";
import { useSnackbar } from "./snackbar-provider";
import { useEffect } from "react";

export default function SnackbarHandler() {
  const searchParams = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();
  const error = searchParams.get("error") || "";

  useEffect(() => {
    if (error) {
      switch (error) {
        case "expired":
          enqueueSnackbar(
            "Your session has expired. Please log in again.",
            "error"
          );
          break;
        case "no_token":
          enqueueSnackbar("No token found. Please log in.", "error");
          break;
        case "invalid_token":
          enqueueSnackbar("Invalid token. Please log in.", "error");
          break;

        case "unauthorized":
          enqueueSnackbar(
            "Sorry, you don't have permission to access the admin panel",
            "error"
          );
          break;
        default:
          enqueueSnackbar(
            "An unknown error occurred. Please try again.",
            "error"
          );
      }
    }
  }, [error]);
  // including missing dep causes infinite loop

  return null;
}
