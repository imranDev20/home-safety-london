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
  Stack,
  Typography,
} from "@mui/joy";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import GoogleIcon from "@mui/icons-material/Google";

import NextLink from "../../_components/common/next-link";
import HookFormError from "../../_components/common/hook-form-error";

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
    },
  });

  const onSubmit = async (data: any) => {};

  return (
    <>
      <Divider />
      <Sheet variant="soft">
        <Container sx={{ py: 10 }}>
          <Grid container>
            <Grid xs={12} sm={8} md={5} sx={{ mx: "auto" }}>
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
                      <Stack spacing={3}>
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
                                placeholder="Enter your email"
                                type="email"
                                fullWidth
                                variant="soft"
                                size="lg"
                              />
                              <HookFormError name="email" errors={errors} />
                            </FormControl>
                          )}
                        />

                        <Button
                          size="lg"
                          type="submit"
                          variant="solid"
                          fullWidth
                        >
                          Login
                        </Button>
                      </Stack>
                    </Box>
                  </form>

                  <Box
                    sx={{ display: "flex", justifyContent: "center", mt: 3 }}
                  >
                    <Typography>
                      Have an account? <Link href="/signp">Register</Link>
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
