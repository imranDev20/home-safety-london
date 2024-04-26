"use client";
import HookFormError from "@/app/_components/common/hook-form-error";
import { PersonalFormInput } from "@/types/form";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  Input,
  InputProps,
  Radio,
  RadioGroup,
  Sheet,
  Typography,
} from "@mui/joy";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input/input";
import { isValidPhoneNumber } from "react-phone-number-input";
import { isValid } from "postcode";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Order } from "@/types/misc";
import { usePathname, useRouter } from "next/navigation";
import { createQueryString } from "@/shared/functions";
import { CorporateFare, Home } from "@mui/icons-material";
// import PhoneNumberInput from "@/app/_components/common/phone-number-input";

const PhoneInputAdapter = React.forwardRef<InputProps, any>(
  function PhoneInputAdapter(props, ref) {
    const { onChange, ...other } = props;

    return (
      <PhoneInput
        defaultCountry="GB"
        international={false}
        placeholder="Enter phone number"
        {...other}
        onChange={(value) => onChange(value)}
      />
    );
  }
);

export default function PersonalDetails() {
  const router = useRouter();
  const pathname = usePathname();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalFormInput>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      house: "",
      postCode: "",
      city: "London",
      parkingOptions: "",
    },
  });

  const onPersonalDetailsSubmit: SubmitHandler<PersonalFormInput> = (data) => {
    router.push(pathname + "?" + createQueryString("active_step", "3"));
    window.scrollTo(0, 300);
  };

  useEffect(() => {
    // if (!order.isServiceStepComplete) {
    //   router.push(pathname + "?" + createQueryString("active_step", "1"));
    // }
  }, [pathname, router]);

  return (
    <>
      <Typography
        component="h3"
        level="h4"
        sx={{
          mb: 3,
        }}
      >
        Personal Details
      </Typography>

      <Grid
        container
        spacing={3}
        component="form"
        onSubmit={handleSubmit(onPersonalDetailsSubmit)}
      >
        <Grid xs={12}>
          <Controller
            control={control}
            name="name"
            rules={{
              required: "Name can't be empty",
            }}
            render={({ field }) => (
              <FormControl error={!!errors.name}>
                <FormLabel>Name</FormLabel>
                <Input {...field} fullWidth size="lg" variant="outlined" />
                <HookFormError name="name" errors={errors} />
              </FormControl>
            )}
          />
        </Grid>
        <Grid xs={12}>
          <Controller
            control={control}
            name="email"
            rules={{
              required: "Email can't be empty",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Email is not valid",
              },
            }}
            render={({ field }) => (
              <FormControl error={!!errors.email}>
                <FormLabel>Email</FormLabel>
                <Input {...field} fullWidth size="lg" variant="outlined" />
                <HookFormError name="email" errors={errors} />
              </FormControl>
            )}
          />
        </Grid>

        <Grid xs={12}>
          <Controller
            control={control}
            name="phone"
            rules={{
              required: "You did not provide a phone number",
              validate: (value: string) => {
                const valid = isValidPhoneNumber(value);

                return valid || `Your provided phone number is not valid`;
              },
            }}
            render={({ field }) => (
              <FormControl error={!!errors.phone}>
                <FormLabel>Phone</FormLabel>
                <Input
                  size="lg"
                  {...field}
                  slotProps={{
                    input: {
                      component: PhoneInputAdapter,
                    },
                  }}
                />
                <HookFormError name="phone" errors={errors} />
              </FormControl>
            )}
          />
        </Grid>

        <Grid xs={12}>
          <Divider>
            <Chip
              sx={{
                fontWeight: 500,
                fontSize: 16,
                px: 2,
                py: 0.5,
              }}
            >
              Address
            </Chip>
          </Divider>
        </Grid>

        <Grid xs={12}>
          <Controller
            control={control}
            name="house"
            rules={{
              required: "House & Street can't be empty",
            }}
            render={({ field }) => (
              <FormControl error={!!errors.house}>
                <FormLabel>House No and Street Name</FormLabel>
                <Input size="lg" {...field} fullWidth variant="outlined" />
                <HookFormError name="house" errors={errors} />
              </FormControl>
            )}
          />
        </Grid>

        <Grid xs={6}>
          <Controller
            control={control}
            name="postCode"
            rules={{
              required: "Post code can't be empty",
              validate: (value) => {
                return isValid(value) || "Not a valid British post code";
              },
            }}
            render={({ field: { value, onChange } }) => (
              <FormControl error={!!errors.postCode}>
                <FormLabel>Post Code</FormLabel>
                <Input
                  size="lg"
                  value={value}
                  onChange={(e) => onChange(e.target.value.toUpperCase())}
                  fullWidth
                  variant="outlined"
                />
                <HookFormError name="postCode" errors={errors} />
              </FormControl>
            )}
          />
        </Grid>
        <Grid xs={6}>
          <Controller
            control={control}
            name="city"
            render={({ field }) => (
              <FormControl error={!!errors.city}>
                <FormLabel>London</FormLabel>
                <Input
                  {...field}
                  size="lg"
                  disabled
                  fullWidth
                  variant="outlined"
                />
                <HookFormError name="city" errors={errors} />
              </FormControl>
            )}
          />
        </Grid>

        <Grid xs={12}>
          <Typography
            component="h3"
            level="h4"
            sx={{
              mb: 3,
              mt: 3,
            }}
          >
            Select Parking Options
          </Typography>
          <Controller
            control={control}
            name="parkingOptions"
            render={({ field }) => (
              <RadioGroup
                size="lg"
                sx={{ gap: 1.5, mb: 5, display: "flex", flexDirection: "row" }}
                {...field}
              >
                {[
                  {
                    value: "flat",
                    name: "Free Parking Available",
                  },
                  {
                    value: "house",
                    name: "Paid Parking Available",
                  },
                  {
                    value: "hmo",
                    name: "No Parking Available",
                  },
                ].map((option) => (
                  <Sheet
                    key={option.value}
                    sx={{
                      p: 2,
                      borderRadius: "md",
                      boxShadow: "sm",
                      flex: 1,
                    }}
                  >
                    <Radio
                      label={
                        <Box>
                          <Typography>{option.name}</Typography>
                        </Box>
                      }
                      overlay
                      disableIcon
                      value={option.value}
                      slotProps={{
                        label: ({ checked }) => ({
                          sx: {
                            fontWeight: "lg",
                            fontSize: "md",
                            color: checked ? "text.primary" : "text.secondary",
                          },
                        }),
                        action: ({ checked }) => ({
                          sx: (theme) => ({
                            ...(checked && {
                              "--variant-borderWidth": "2px",
                              "&&": {
                                // && to increase the specificity to win the base :hover styles
                                borderColor: theme.vars.palette.primary[500],
                              },
                            }),
                          }),
                        }),
                      }}
                    />
                  </Sheet>
                ))}
              </RadioGroup>
            )}
          />
        </Grid>

        <Grid xs={12}>
          <Typography
            component="h3"
            level="h4"
            sx={{
              mb: 3,
            }}
          >
            Is property in congestion zone?
          </Typography>
          <Controller
            control={control}
            name="parkingOptions"
            render={({ field }) => (
              <RadioGroup
                size="lg"
                sx={{ gap: 1.5, mb: 5, display: "flex", flexDirection: "row" }}
                {...field}
              >
                {[
                  {
                    value: "flat",
                    name: "Yes",
                  },
                  {
                    value: "house",
                    name: "No",
                  },
                ].map((option) => (
                  <Sheet
                    key={option.value}
                    sx={{
                      p: 2,
                      borderRadius: "md",
                      boxShadow: "sm",
                      flex: 1,
                    }}
                  >
                    <Radio
                      label={
                        <Box>
                          <Typography>{option.name}</Typography>
                        </Box>
                      }
                      overlay
                      disableIcon
                      value={option.value}
                      slotProps={{
                        label: ({ checked }) => ({
                          sx: {
                            fontWeight: "lg",
                            fontSize: "md",
                            color: checked ? "text.primary" : "text.secondary",
                          },
                        }),
                        action: ({ checked }) => ({
                          sx: (theme) => ({
                            ...(checked && {
                              "--variant-borderWidth": "2px",
                              "&&": {
                                // && to increase the specificity to win the base :hover styles
                                borderColor: theme.vars.palette.primary[500],
                              },
                            }),
                          }),
                        }),
                      }}
                    />
                  </Sheet>
                ))}
              </RadioGroup>
            )}
          />
        </Grid>

        <Grid
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            type="submit"
            variant="solid"
            sx={{
              mt: 2,
            }}
          >
            Next: Confirmation
          </Button>
        </Grid>
      </Grid>
    </>
  );
}