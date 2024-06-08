"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
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
import { loginAccount } from "@/services/account.services";
import { useSnackbar } from "@/app/_components/snackbar-provider";
import { useRouter } from "next/navigation";
import { LoginPayload } from "@/types/account";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/response";

export default function LoginForm() {
  const [visibilityToggle, setVisibilityToggle] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<LoginPayload>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync: loginUserMutate, isPending: isLoginUserMutateLoading } =
    useMutation({
      mutationFn: (userData: LoginPayload) => loginAccount(userData),
      onSuccess: (response) => {
        queryClient.invalidateQueries({ queryKey: ["users", "current-user"] });
        queryClient.resetQueries();

        if (response.data.role === "admin") {
          router.replace("/admin");
        } else {
          router.replace("/");
        }
        reset();
        enqueueSnackbar(response?.message, "success");
      },
      onError: (error: AxiosError<ErrorResponse>) => {
        enqueueSnackbar(
          error.response?.data.message || error?.message,
          "error"
        );
      },
    });

  const onLoginFormSubmit: SubmitHandler<LoginPayload> = async (data) => {
    const payload = {
      password: data.password,
      email: data.email,
    };
    await loginUserMutate(payload);
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

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                my: 2,
              }}
            >
              <Checkbox size="sm" label="Remember me" name="persistent" />
              <JoyLink level="title-sm">Forgot your password?</JoyLink>
            </Box>

            <Stack gap={4} sx={{ mt: 2 }}>
              <Button
                type="submit"
                fullWidth
                loading={isLoginUserMutateLoading}
              >
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
