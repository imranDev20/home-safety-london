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
  Grid,
  Input,
  InputProps,
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

export default function PersonalDetails({
  order,
  setOrder,
}: {
  order: Order;
  setOrder: Dispatch<SetStateAction<Order>>;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalFormInput>({
    defaultValues: {
      name: order.name || "",
      email: order.email || "",
      phone: order.phone || "",
      house: order.house || "",
      postCode: order.postCode || "",
      city: "London",
    },
  });

  const onPersonalDetailsSubmit: SubmitHandler<PersonalFormInput> = (data) => {
    setOrder({ ...order, ...data, isPersonalStepComplete: true });
    router.push(pathname + "?" + createQueryString("active_step", "3"));
    window.scrollTo(0, 300);
  };

  useEffect(() => {
    if (!order.isServiceStepComplete) {
      router.push(pathname + "?" + createQueryString("active_step", "1"));
    }
  }, [order.isServiceStepComplete, pathname, router]);

  if (!order.isServiceStepComplete) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: 300,
        }}
      >
        <CircularProgress size="lg" thickness={3} />
        <Typography
          sx={{
            mt: 3,
            fontWeight: 500,
            fontSize: 20,
          }}
        >
          Loading
        </Typography>
      </Box>
    );
  }

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
                <Input
                  {...field}
                  fullWidth
                  size="lg"
                  variant="outlined"
                  placeholder="Your name"
                />
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
                <Input
                  {...field}
                  fullWidth
                  size="lg"
                  variant="outlined"
                  placeholder="Your email address"
                />
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
                <Input
                  size="lg"
                  {...field}
                  placeholder="Phone number"
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
                <Input
                  size="lg"
                  {...field}
                  fullWidth
                  variant="outlined"
                  placeholder="Your house number and street name"
                />
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
                <Input
                  size="lg"
                  value={value}
                  onChange={(e) => onChange(e.target.value.toUpperCase())}
                  fullWidth
                  variant="outlined"
                  placeholder="Your post code"
                />
              </FormControl>
            )}
          />
          <HookFormError name="postCode" errors={errors} />
        </Grid>
        <Grid xs={6}>
          <Controller
            control={control}
            name="city"
            render={({ field }) => (
              <FormControl error={!!errors.city}>
                <Input
                  {...field}
                  size="lg"
                  disabled
                  fullWidth
                  placeholder="City"
                  variant="outlined"
                />
                <HookFormError name="city" errors={errors} />
              </FormControl>
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
