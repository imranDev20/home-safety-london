"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Link as JoyLink,
  Stack,
  Typography,
} from "@mui/joy";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import HookFormError from "@/app/_components/common/hook-form-error";
import Link from "next/link";
import { BUSINESS_NAME } from "@/shared/constants";
import { GoogleIcon } from "@/app/_components/common/icons";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface RegisterFormInput {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [visibilityToggle, setVisibilityToggle] = useState<boolean>(false);

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<RegisterFormInput>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onLoginFormSubmit: SubmitHandler<RegisterFormInput> = async (data) => {
    try {
      console.log(data);
    } catch (error) {}
  };

  return (
    <>
      <Stack gap={4} sx={{ mb: 2 }}>
        <Stack gap={1}>
          <Typography component="h1" level="h3">
            Login
          </Typography>
          <Typography level="body-sm">
            New to the site?{" "}
            <JoyLink component={Link} href="/register" level="title-sm">
              Register!
            </JoyLink>
          </Typography>
        </Stack>
        <Button
          variant="soft"
          color="neutral"
          fullWidth
          startDecorator={<GoogleIcon />}
        >
          Continue with Google
        </Button>
      </Stack>
      <Divider
        sx={(theme) => ({
          [theme.getColorSchemeSelector("light")]: {
            color: { xs: "#FFF", md: "text.tertiary" },
          },
        })}
      >
        or
      </Divider>

      <form onSubmit={handleSubmit(onLoginFormSubmit)}>
        <Box sx={{ pt: 2 }}>
          <Stack gap={2}>
            <Controller
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  message: "Provide a valid email",
                },
              }}
              control={control}
              render={({ field }) => (
                <FormControl error={!!errors.email} size="md">
                  <FormLabel>Email</FormLabel>

                  <Input
                    {...field}
                    placeholder="Type your email..."
                    type="email"
                    fullWidth
                    variant="outlined"
                  />
                  <HookFormError name="email" errors={errors} />
                </FormControl>
              )}
            />

            <Controller
              name="password"
              rules={{
                required: "Password is required",
              }}
              control={control}
              render={({ field }) => (
                <FormControl error={!!errors.password} size="md">
                  <FormLabel>Password</FormLabel>

                  <Input
                    {...field}
                    placeholder="Type your password"
                    fullWidth
                    variant="outlined"
                    type={visibilityToggle ? "text" : "password"}
                    endDecorator={
                      <IconButton
                        onClick={() => setVisibilityToggle((prev) => !prev)}
                      >
                        {visibilityToggle ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    }
                  />
                  <HookFormError errors={errors} name="password" />
                </FormControl>
              )}
            />

            <Stack gap={4} sx={{ mt: 2 }}>
              <Button type="submit" fullWidth>
                Login
              </Button>
            </Stack>
          </Stack>

          <Box component="footer" sx={{ mt: 5 }}>
            <Typography level="body-xs" textAlign="center">
              © {BUSINESS_NAME} {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </form>
    </>
  );
}
