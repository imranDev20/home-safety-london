"use client";
import React from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  FormControl,
  Grid,
  Input,
  Sheet,
  Typography,
} from "@mui/joy";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import GoogleIcon from "@mui/icons-material/Google";

import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "@/config/firebase";
import NextLink from "../_components/common/next-link";
import HookFormError from "../_components/common/hook-form-error";

export default function Login() {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    getValues,
    control,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [signInWithEmailAndPassword, eUser, eLoading, Eerror] =
    useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  const onSubmit = async (data: any) => {
    await signInWithEmailAndPassword(data.email, data.password);
    console.log("sign in successfully done!");
    reset();
  };

  const resetPassword = () => {
    const email = getValues("email");
    console.log(email);
    sendPasswordResetEmail(email);
  };

  return (
    <>
      <Divider />
      <Sheet variant="soft">
        <Container sx={{ py: 10 }}>
          <Grid container>
            <Grid xs={5} sx={{ mx: "auto" }}>
              <Card
                variant="plain"
                sx={{
                  p: 5,
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      component="h1"
                      level="h2"
                      sx={{
                        mb: 2,
                      }}
                    >
                      Login
                    </Typography>
                  </Box>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ pt: 2 }}>
                      <Controller
                        name="email"
                        rules={{
                          required: "Email is Required",
                          pattern: {
                            value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                            message: "Provide a valid email",
                          },
                        }}
                        control={control}
                        render={({ field }) => (
                          <FormControl
                            error={!!errors.email}
                            sx={{
                              mb: 2,
                            }}
                          >
                            <Input
                              {...field}
                              placeholder="Email"
                              type="email"
                              fullWidth
                              variant="soft"
                              size="lg"
                            />
                            <HookFormError name="email" errors={errors} />
                          </FormControl>
                        )}
                      />

                      <Controller
                        control={control}
                        name="password"
                        rules={{
                          required: "Password id Required",
                          pattern: {
                            value:
                              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message:
                              "At least one letter, one digit & one special charectar",
                          },
                          minLength: {
                            value: 8,
                            message: "Minimum length of 8 characters",
                          },
                        }}
                        render={({ field }) => (
                          <FormControl
                            error={!!errors.password}
                            sx={{
                              mb: 2,
                            }}
                          >
                            <Input
                              {...field}
                              placeholder="Password"
                              fullWidth
                              variant="soft"
                              size="lg"
                            />
                            <HookFormError name="password" errors={errors} />
                          </FormControl>
                        )}
                      />

                      <Box
                        sx={{ display: "flex", justifyContent: "end", mb: 3 }}
                      >
                        <NextLink href="/login" onClick={resetPassword}>
                          Forgot password?
                        </NextLink>
                      </Box>

                      <Button size="lg" type="submit" variant="solid" fullWidth>
                        Login
                      </Button>
                      <Divider sx={{ width: 200, mx: "auto", py: 2 }}>
                        OR
                      </Divider>
                    </Box>
                  </form>
                  <Button
                    type="submit"
                    variant="soft"
                    size="lg"
                    fullWidth
                    onClick={() => signInWithGoogle()}
                    startDecorator={<GoogleIcon />}
                  >
                    Continue with Google
                  </Button>

                  <Box
                    sx={{ display: "flex", justifyContent: "center", mt: 3 }}
                  >
                    <Typography>
                      Have an account? <Link href="/signup">Register</Link>
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Sheet>
    </>
  );
}
