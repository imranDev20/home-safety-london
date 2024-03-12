import { InputProps, Input } from "@mui/joy";
import { forwardRef } from "react";

const PhoneNumberInput = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    return (
      <Input {...props} ref={ref} fullWidth variant="outlined" name="phone" />
    );
  }
);

PhoneNumberInput.displayName = "PhoneNumberInput";

export default PhoneNumberInput;
