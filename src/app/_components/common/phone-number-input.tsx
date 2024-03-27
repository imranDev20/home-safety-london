import { InputProps, Input } from "@mui/joy";
import { forwardRef } from "react";

const PhoneNumberInput = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const { variant = "outlined" } = props;
    return (
      <Input {...props} ref={ref} fullWidth variant={variant} name="phone" />
    );
  }
);

PhoneNumberInput.displayName = "PhoneNumberInput";

export default PhoneNumberInput;
