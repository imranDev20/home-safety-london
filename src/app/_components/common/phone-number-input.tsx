import { Input, InputProps } from "@mui/joy";
import { forwardRef } from "react";

const PhoneNumberInput = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    return <Input {...props} inputRef={ref} fullWidth name="phone" />;
  }
);

PhoneNumberInput.displayName = "PhoneNumberInput";

export default PhoneNumberInput;
