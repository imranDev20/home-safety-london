"use client";
import HookFormError from "@/app/_components/common/hook-form-error";
import { PersonalFormInput } from "@/types/form";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Input,
  Typography,
} from "@mui/joy";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input/react-hook-form-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import { isValid } from "postcode";
import PhoneNumberInput from "@/app/_components/common/phone-number-input";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Order } from "@/types/misc";
import { usePathname, useRouter } from "next/navigation";
import { createQueryString } from "@/shared/functions";

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
        <CircularProgress size="lg" />
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
        component="h2"
        level="title-md"
        sx={{
          mb: 3,
        }}
      >
        2. Personal Details
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
              <Input
                {...field}
                fullWidth
                variant="outlined"
                placeholder="Your name"
              />
            )}
          />
          <HookFormError name="name" errors={errors} />
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
              <Input
                {...field}
                fullWidth
                variant="outlined"
                placeholder="Your email address"
              />
            )}
          />
          <HookFormError name="email" errors={errors} />
        </Grid>

        <Grid xs={12}>
          <PhoneInput
            name="phone"
            control={control}
            defaultCountry="GB"
            inputComponent={PhoneNumberInput}
            placeholder="Your phone number"
            variant="outlined"
            country="GB"
            rules={{
              required: "You did not provide a phone number",
              validate: (value: string) => {
                const valid = isValidPhoneNumber(value);

                return valid || `Your provided phone number is not valid`;
              },
            }}
          />
          <HookFormError name="phone" errors={errors} />
        </Grid>

        <Grid xs={12}>
          <Divider>
            <Chip
              sx={{
                fontWeight: 500,
                fontSize: 16,
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
              <Input
                {...field}
                fullWidth
                variant="outlined"
                placeholder="Your house number and street name"
              />
            )}
          />
          <HookFormError name="house" errors={errors} />
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
              <Input
                value={value}
                onChange={(e) => onChange(e.target.value.toUpperCase())}
                fullWidth
                variant="outlined"
                placeholder="Your post code"
              />
            )}
          />
          <HookFormError name="postCode" errors={errors} />
        </Grid>
        <Grid xs={6}>
          <Controller
            control={control}
            name="city"
            render={({ field }) => (
              <Input
                {...field}
                disabled
                fullWidth
                placeholder="City"
                variant="outlined"
              />
            )}
          />
          <HookFormError name="city" errors={errors} />
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
