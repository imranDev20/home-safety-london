"use client";
import React from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  Input,
  InputProps,
  Textarea,
  Typography,
} from "@mui/joy";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import HookFormError from "@/app/_components/common/hook-form-error";
import PhoneInput from "react-phone-number-input/input";
import {
  isValidPhoneNumber,
  formatPhoneNumber,
} from "react-phone-number-input";

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
  message: string;
};

export default function ContactUsForm() {
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
      phone: "",
    },
  });
  const onContactFormSubmit: SubmitHandler<ContactFormInput> = (data) => {
    const payload = { ...data, phone: formatPhoneNumber(data.phone) };

    console.log(payload);
  };

  return (
    <Container sx={{ py: 10 }}>
      <Box>
        <Box sx={{ textAlign: "center", py: 3 }}>
          <Typography
            component="h2"
            level="h2"
            sx={{
              textAlign: "center",
              mb: 2,
            }}
          >
            Get In Touch
          </Typography>
          <Typography color="neutral">
            Our friendly customer service team are ready to help you choose
            <br />
            the best safety certificate for your needs.
          </Typography>
        </Box>
        <form onSubmit={handleSubmit(onContactFormSubmit)}>
          <Grid
            container
            spacing={3}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Grid xs={12} sm={10} md={7} sx={{ px: { xs: 4, sm: 4, md: 0 } }}>
              <Box>
                <Grid container spacing={2}>
                  <Grid xs={12}>
                    <Controller
                      name="name"
                      rules={{
                        required: "Please enter your name",
                      }}
                      control={control}
                      render={({ field }) => (
                        <FormControl
                          error={!!errors.name}
                          sx={{
                            mb: 1,
                          }}
                        >
                          <Input
                            {...field}
                            placeholder="Your Name"
                            type="text"
                            fullWidth
                            variant="outlined"
                            size="lg"
                          />
                          <HookFormError name="name" errors={errors} />
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <Grid xs={12} sm={12} md={6}>
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
                        <FormControl
                          error={!!errors.email}
                          sx={{
                            mb: 1,
                          }}
                        >
                          <Input
                            {...field}
                            placeholder="Your Email Address"
                            type="email"
                            fullWidth
                            variant="outlined"
                            size="lg"
                          />
                          <HookFormError name="email" errors={errors} />
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <Grid xs={12} sm={12} md={6}>
                    <Controller
                      name="phone"
                      control={control}
                      rules={{
                        required: "Please enter your phone number",
                        validate: (value: string) => {
                          const valid = isValidPhoneNumber(value);

                          return (
                            valid || `Your provided phone number is not valid`
                          );
                        },
                      }}
                      render={({ field }) => (
                        <FormControl error={!!errors.phone} sx={{ mb: 1 }}>
                          <Input
                            {...field}
                            placeholder="Your Phone Number"
                            variant="outlined"
                            fullWidth
                            size="lg"
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
                    <Controller
                      name="message"
                      rules={{
                        required: "Message is required",
                      }}
                      control={control}
                      render={({ field }) => (
                        <FormControl error={!!errors.message} sx={{ mb: 1 }}>
                          <Textarea
                            {...field}
                            minRows={5}
                            placeholder="Your Message here..."
                            variant="outlined"
                            size="lg"
                          />
                          <HookFormError name="message" errors={errors} />
                        </FormControl>
                      )}
                    />
                  </Grid>
                </Grid>
                <Box sx={{ pt: 2 }}>
                  <Button type="submit" variant="solid" sx={{ width: "100%" }}>
                    Send Message
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}
