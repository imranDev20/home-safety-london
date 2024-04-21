"use client";
import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  Grid,
  Input,
  Sheet,
  Stack,
  Typography,
} from "@mui/joy";
import Link from "next/link";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import HookFormError from "../../_components/common/hook-form-error";

export default function SignUp() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<{ email: string }> = () => {};

  return (
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
                    Register
                  </Typography>
                </Box>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <Box sx={{ pt: 2 }}>
                    <Stack spacing={3}>
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

                      <Button size="lg" type="submit" variant="solid" fullWidth>
                        Register
                      </Button>
                    </Stack>
                  </Box>
                </form>

                <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                  <Typography>
                    Have an account? <Link href="/signup">Login</Link>
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Sheet>
  );
}
