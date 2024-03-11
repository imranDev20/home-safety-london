"use client";
import { ErrorMessage } from "@hookform/error-message";
import FormHelperText from "@mui/joy/FormHelperText";
import { FieldErrors } from "react-hook-form";

type ErrorProps = {
  errors: FieldErrors;
  name: string;
};

export default function HookFormError({ errors, name }: ErrorProps) {
  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ message }) => (
        <FormHelperText
          sx={{
            fontSize: 14,
          }}
        >
          {message}
        </FormHelperText>
      )}
    />
  );
}
