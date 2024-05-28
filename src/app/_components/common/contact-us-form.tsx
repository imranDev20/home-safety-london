"use client";
import React from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  Input,
  InputProps,
  Stack,
  Textarea,
  useTheme,
} from "@mui/joy";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import HookFormError from "@/app/_components/common/hook-form-error";
import PhoneInput from "react-phone-number-input/input";
import {
  isValidPhoneNumber,
  formatPhoneNumber,
} from "react-phone-number-input";
import useRecaptchaToken from "../hooks/use-recaptcha-token";
import { submitContactUsForm } from "@/services/contact.services";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "../snackbar-provider";
import useBreakpoints from "../hooks/use-breakpoints";

const PhoneInputAdapter = React.forwardRef<InputProps, any>(
  function PhoneInputAdapter(props, ref) {
    const { onChange, ...other } = props;

    return (
      <PhoneInput
        defaultCountry="GB"
        international={false}
        placeholder="Enter phone number"
        {...other}
        ref={ref}
        onChange={(value) => onChange(value)}
      />
    );
  }
);

type ContactFormInput = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export default function ContactUsForm() {
  const [reCaptchaToken, regenerateToken] = useRecaptchaToken();
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();

  const { isXs, isSm } = useBreakpoints();

  console.log(reCaptchaToken);

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<ContactFormInput>({
    defaultValues: {
      name: "",
      email: "",
      message: "",
      subject: "",
      phone: "",
    },
  });

  const {
    mutateAsync: submitContactUsFormMutate,
    isPending: isSubmitContactUsFormPending,
  } = useMutation({
    mutationFn: async (contactFormData: any) => {
      const response = await submitContactUsForm(contactFormData);
      return response;
    },
    onSuccess: (response) => {
      reset();
      enqueueSnackbar(response.message, "success");
      regenerateToken();
    },

    onError: (error) => {
      regenerateToken();
      enqueueSnackbar(error.message, "error");
    },
  });

  const onContactFormSubmit: SubmitHandler<ContactFormInput> = async (data) => {
    const payload = {
      ...data,
      phone: formatPhoneNumber(data.phone),
      reCaptchaToken: reCaptchaToken,
    };

    await submitContactUsFormMutate(payload);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onContactFormSubmit)}>
      <Grid container spacing={3}>
        <Grid xs={12} lg={6}>
          <Controller
            name="name"
            rules={{
              required: "Please enter your name",
            }}
            control={control}
            render={({ field }) => (
              <FormControl error={!!errors.name} size="lg">
                <Input
                  {...field}
                  placeholder="Your Name"
                  type="text"
                  fullWidth
                  color="secondary"
                  sx={{
                    color: theme.palette.text.primary,
                  }}
                />
                <HookFormError name="name" errors={errors} />
              </FormControl>
            )}
          />
        </Grid>

        <Grid xs={12} lg={6}>
          <Controller
            name="email"
            rules={{
              required: "Please enter your email",
              pattern: {
                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                message: "provide a valid email",
              },
            }}
            control={control}
            render={({ field }) => (
              <FormControl error={!!errors.email} size="lg">
                <Input
                  {...field}
                  placeholder="Email Address"
                  type="email"
                  color="secondary"
                  variant="outlined"
                  fullWidth
                  sx={{
                    color: theme.palette.text.primary,
                  }}
                />
                <HookFormError name="email" errors={errors} />
              </FormControl>
            )}
          />
        </Grid>

        <Grid xs={12} lg={6}>
          <Controller
            name="phone"
            control={control}
            rules={{
              required: "Please enter your phone number",
              validate: (value: string) => {
                const valid = isValidPhoneNumber(value);

                return valid || `Your provided phone number is not valid`;
              },
            }}
            render={({ field }) => (
              <FormControl error={!!errors.phone} size="lg">
                <Input
                  {...field}
                  placeholder="Phone Number"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  slotProps={{
                    input: {
                      component: PhoneInputAdapter,
                    },
                  }}
                  sx={{
                    color: theme.palette.text.primary,
                  }}
                />
                <HookFormError name="phone" errors={errors} />
              </FormControl>
            )}
          />
        </Grid>

        <Grid xs={12} lg={6}>
          <Controller
            name="subject"
            rules={{
              required: "Please provide a subject",
            }}
            control={control}
            render={({ field }) => (
              <FormControl error={!!errors.subject} size="lg">
                <Input
                  {...field}
                  placeholder="Give a subject"
                  type="text"
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  sx={{
                    color: theme.palette.text.primary,
                  }}
                />
                <HookFormError name="subject" errors={errors} />
              </FormControl>
            )}
          />
        </Grid>

        <Grid xs={12}>
          <Controller
            name="message"
            rules={{
              required: "Message is required",
            }}
            control={control}
            render={({ field }) => (
              <FormControl error={!!errors.message} size="lg">
                <Textarea
                  {...field}
                  minRows={4}
                  placeholder="Type your Message here..."
                  variant="outlined"
                  color="secondary"
                  sx={{
                    color: theme.palette.text.primary,
                  }}
                />
                <HookFormError name="message" errors={errors} />
              </FormControl>
            )}
          />
        </Grid>

        <Grid xs={12}>
          <Button
            type="submit"
            variant="solid"
            color="secondary"
            sx={{ width: "100%" }}
            loading={isSubmitContactUsFormPending}
            loadingPosition="start"
            size="lg"
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
