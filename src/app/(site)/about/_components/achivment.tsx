"use client";
import React, { useState } from "react";
import { Box, Container, Grid, Sheet, Typography } from "@mui/joy";
import CountUp from "react-countup";
import { FireRiskIcon } from "@/app/_components/common/icons";

export default function Achivment() {
  const [counterOn, setCounterOn] = useState(false);
  return (
    <Sheet variant="soft">
      <Container sx={{ py: 10 }}>
        <Grid container spacing={3}>
          <Grid xs={3}>
            <Box
              sx={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <FireRiskIcon
                sx={{ fontSize: 40, border: 2, borderRadius: 50, mx: "auto" }}
              />
              <CountUp start={0} end={500} duration={5} delay={0} />
              <Typography>+ Project Done</Typography>
            </Box>
          </Grid>
          <Grid xs={3}>
            <Box sx={{ textAlign: "center" }}>
              <CountUp start={0} end={900} duration={5} delay={0} />
              <Typography>+ Happy Client</Typography>
            </Box>
          </Grid>
          <Grid xs={3}>
            <Box sx={{ textAlign: "center" }}>
              <CountUp start={0} end={1500} duration={5} delay={0} />
              <Typography>+ Expriance Staff</Typography>
            </Box>
          </Grid>
          <Grid xs={3}>
            <Box sx={{ textAlign: "center" }}>
              <CountUp start={0} end={30} duration={5} delay={0} />
              <Typography>+ win Awards</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Sheet>
  );
}
