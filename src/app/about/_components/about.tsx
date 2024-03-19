"use client";
import React from "react";
import { Box, Button, Container, Divider, Grid, Typography } from "@mui/joy";
import engineer from "../../../images/engineer.webp";
import Image from "next/image";
import { theme } from "@/shared/theme";
import { EicrIcon } from "@/app/_components/common/icons";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function AboutUs() {
  return (
    <Container sx={{ my: 10 }}>
      <Grid container spacing={4}>
        <Grid xs={6}>
          <Box>
            <Image
              src={engineer}
              alt="aboutImage"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 20,
                overflow: "hidden",
              }}
            />
          </Box>
        </Grid>
        <Grid xs={6}>
          <Box>
            <Typography
              sx={{
                color: theme.colorSchemes.light.palette.secondary[500],
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: 2,
              }}
            >
              About us
            </Typography>
            <Typography component="h1" level="h1">
              We Are Commited to <br />
              <Typography
                component="span"
                sx={{
                  color: theme.colorSchemes.light.palette.secondary[500],
                  fontWeight: 700,
                }}
              >
                Provide Quality
              </Typography>{" "}
              Service
            </Typography>
            <Typography color="neutral" sx={{ py: 2 }}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Laboriosam maxime natus totam ullam iure accusantium ad, ex
              facilis nam laudantium explicabo eos repudiandae deleniti dicta
              omnis ipsam soluta incidunt. Eaque.
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "start" }}>
                <EicrIcon color="primary" sx={{ fontSize: 45 }} />
                <Box>
                  <Typography>Emergency Repairs</Typography>
                  <Typography>
                    It is a long fact that a rader will be distracted
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "start" }}>
                <EicrIcon color="primary" sx={{ fontSize: 45 }} />
                <Box>
                  <Typography>Emergency Repairs</Typography>
                  <Typography>
                    It is a long fact that a rader will be distracted
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Divider />
            <Box sx={{ py: 3 }}>
              <Typography sx={{ display: "flex", alignItems: "center", pb: 2 }}>
                <CheckCircleIcon color="primary" sx={{ mr: 1 }} />
                <Typography component="span" color="neutral">
                  We alaways to ensure to give our best for out customer
                </Typography>
              </Typography>
              <Typography sx={{ display: "flex", alignItems: "center", pb: 2 }}>
                <CheckCircleIcon color="primary" sx={{ mr: 1 }} />
                <Typography component="span" color="neutral">
                  We give professional support by our professional
                </Typography>
              </Typography>
              <Typography sx={{ display: "flex", alignItems: "center", pb: 2 }}>
                <CheckCircleIcon color="primary" sx={{ mr: 1 }} />
                <Typography component="span" color="neutral">
                  Our mission is to provide quality product design
                </Typography>
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <Button variant="solid">Get Started Now</Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
