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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerAccount } from "@/services/account.services";
import { useSnackbar } from "@/app/_components/snackbar-provider";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";

interface RegisterFormInput {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

interface RegisterResponse {
  success: boolean;
  message: string;
  data: { name: string; token: string; email: string; role: string };
}

export default function RegisterForm() {
  const [visibilityToggle, setVisibilityToggle] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const {
    formState: { errors },
    handleSubmit,
    control,
    watch,
    reset,
  } = useForm<RegisterFormInput>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    mutateAsync: registerUserMutate,
    isPending: isRegisterUserMutateLoading,
  } = useMutation({
    mutationFn: async (userData: any) => {
      const response = await registerAccount(userData);
      return response;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["users", "current_user"] });
      reset();
      enqueueSnackbar(response?.message, "success");
      router.replace("/");
    },
    onError: (error) => {
      console.log(error);
      enqueueSnackbar(error?.message, "error");
    },
  });

  const onRegisterFormSubmit: SubmitHandler<RegisterFormInput> = async (
    data
  ) => {
    const payload = {
      name: data.name,
      password: data.password,
      email: data.email,
    };
    await registerUserMutate(payload);
  };

  return (
    <>
      <Stack gap={4} sx={{ mb: 2 }}>
        <Stack gap={1}>
          <Typography component="h1" level="h3">
            Register
          </Typography>
          <Typography level="body-sm">
            Already have an account?{" "}
            <JoyLink component={Link} href="/login" level="title-sm">
              Login!
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

      <form onSubmit={handleSubmit(onRegisterFormSubmit)}>
        <Box sx={{ pt: 2 }}>
          <Stack gap={2}>
            <Controller
              name="name"
              rules={{
                required: "Name is required",
              }}
              control={control}
              render={({ field }) => (
                <FormControl error={!!errors.name} size="md">
                  <FormLabel>Name</FormLabel>
                  <Input
                    {...field}
                    placeholder="Type your name..."
                    fullWidth
                    variant="outlined"
                  />
                  <HookFormError name="name" errors={errors} />
                </FormControl>
              )}
            />
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

            <Controller
              name="confirmPassword"
              rules={{
                required: "Please confirm your password",
                validate: (value) => {
                  const password = watch("password");
                  return password === value || "Passwords do not match";
                },
              }}
              control={control}
              render={({ field }) => (
                <FormControl error={!!errors.confirmPassword} size="md">
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    {...field}
                    placeholder="Confirm your password"
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
                  <HookFormError errors={errors} name="confirmPassword" />
                </FormControl>
              )}
            />

            <Stack gap={4} sx={{ mt: 2 }}>
              <Button
                type="submit"
                fullWidth
                loading={isRegisterUserMutateLoading}
              >
                Register
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
